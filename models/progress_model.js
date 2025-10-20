const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // un documento por usuario
  },
  objetivo: {
    type: Number,
    default: 1500,
  },
  comida: {
    type: Number,
    default: 0,
  },
  ejercicio: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Progress", progressSchema);
