const mongoose = require('mongoose');

const globalStateSchema = new mongoose.Schema({
  totalDonated: { type: Number, default: 0 } // Acumulador de BIVIX Care
});

module.exports = mongoose.model('GlobalState', globalStateSchema);
