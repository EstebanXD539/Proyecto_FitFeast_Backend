// models/ejercicio.model.js
const mongoose = require('mongoose');

const EjercicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  categoria: { 
    type: String, 
    enum: ['fuerza', 'cardio', 'movilidad', 'trote', 'ciclismo', 'pilates', 'otro'], 
    default: 'otro' 
  },
  musculoObjetivo: String,
  dificultad: { 
    type: String, 
    enum: ['básico', 'intermedio', 'avanzado'], 
    default: 'básico' 
  },
  duracion: Number, // en minutos
  valor: { 
    type: Number, 
    required: true, 
    default: 0 
  },
  imagenUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Ejercicio', EjercicioSchema);
