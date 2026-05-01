const User = require('../models/User');
const GlobalState = require('../models/GlobalState');

const processSecureWithdrawal = async (req, res) => {
  const { telegramId, amount, address, type } = req.body; 

  try {
    console.log(`[BIVIX SYSTEM] Iniciando solicitud de retiro para ID: ${telegramId}`);

    if (amount < 5) return res.status(400).json({ error: '¡BIVIX: El mínimo de retiro es 5 USDT!' });

    // Bloqueo Atómico (Anti-Double Spend)
    const user = await User.findOneAndUpdate(
      { telegramId, isProcessingWithdrawal: { $ne: true } }, 
      { $set: { isProcessingWithdrawal: true } }, 
      { new: true }
    );

    if (!user) {
      console.warn(`[BIVIX ALERT] Intento de doble gasto bloqueado para ID: ${telegramId}`);
      return res.status(429).json({ error: '¡BIVIX: Ya tienes una transacción en proceso!' });
    }

    let availableFunds = type === 'commission' ? user.commissionBalance : (user.balance + user.activeDeposit);
    if (availableFunds < amount) {
      await User.updateOne({ telegramId }, { $set: { isProcessingWithdrawal: false } });
      return res.status(400).json({ error: '¡BIVIX: Fondos insuficientes!' });
    }

    // Tarifa BIVIX Care (4%)
    const socialFee = amount * 0.04;
    const netAmount = amount - socialFee;

    // TODO: Ejecutar API de Oxapay aquí ( await processOxaPayWithdrawal(address, netAmount); )
    
    // Descontar fondos
    if (type === 'commission') {
      user.commissionBalance -= amount;
    } else {
      if (user.balance >= amount) user.balance -= amount;
      else {
        user.activeDeposit -= (amount - user.balance);
        user.balance = 0;
      }
    }

    user.isProcessingWithdrawal = false;
    await user.save();

    // Actualizar fondo BIVIX Care
    await GlobalState.findOneAndUpdate({}, { $inc: { totalDonated: socialFee } }, { upsert: true });

    console.log(`[BIVIX SUCCESS] Retiro de ${netAmount} USDT procesado. BIVIX Care aportó: ${socialFee} USDT.`);
    
    res.json({ 
      success: true, 
      netReceived: netAmount, 
      message: '¡BIVIX: Retiro exitoso BEP-20!' 
    });

  } catch (error) {
    await User.updateOne({ telegramId: req.body.telegramId }, { $set: { isProcessingWithdrawal: false } });
    console.error(`[BIVIX ERROR] Fallo en pasarela de pago:`, error);
    res.status(500).json({ error: '¡BIVIX: Error del servidor de pagos. Intenta más tarde.' });
  }
};

module.exports = { processSecureWithdrawal };
