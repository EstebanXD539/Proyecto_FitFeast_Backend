const mongoose = require("mongoose");

const RecetaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  ingredientes: [{ type: String }],
  preparacion: [{ type: String }],
  imagenURl: { type: String },
  categoria: { type: String }
}, { collection: "recetas_saludables" }); 

module.exports = mongoose.model("Receta", RecetaSchema);
