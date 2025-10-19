const mongoose = require("mongoose");

const progresoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fecha: { type: Date, default: Date.now },
  objetivo: { type: Number, default: 1500 },
  comida: { type: Number, default: 0 },
  ejercicio: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Progreso", progresoSchema);
