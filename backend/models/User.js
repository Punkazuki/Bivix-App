const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 }, 
  activeDeposit: { type: Number, default: 0 }, 
  commissionBalance: { type: Number, default: 0 }, // Ganancias BIVIX Team
  
  licenseLevel: { type: String, default: 'Ninguna' },
  streak: { type: Number, default: 0 }, // BIVIX Streak
  quizzesToday: { type: Number, default: 0 },
  lastQuizDate: { type: Date, default: null },
  
  referredBy: { type: String, default: null },
  isProcessingWithdrawal: { type: Boolean, default: false } // Anti-Doble Gasto
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
