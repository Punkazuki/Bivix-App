const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { processSecureWithdrawal } = require('./controllers/withdrawalController');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Base de Datos
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('🟢[BIVIX SYSTEM] MongoDB Conectado'))
  .catch(err => console.error('🔴[BIVIX ERROR] Fallo conexión MongoDB', err));

// Rutas Principales
app.post('/api/withdraw', processSecureWithdrawal);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 [BIVIX SYSTEM] Servidor corriendo en puerto ${PORT}`));
