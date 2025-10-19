const Receta = require('../models/receta_model');

// Obtener todas las recetas
exports.obtenerRecetas = async (req, res) => {
  try {
    const recetas = await Receta.find();
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener recetas', error });
  }
};

// Obtener receta por ID
exports.obtenerRecetaPorId = async (req, res) => {
  try {
    const receta = await Receta.findById(req.params.id);
    if (!receta) return res.status(404).json({ message: 'Receta no encontrada' });
    res.json(receta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener receta', error });
  }
};

// Crear nueva receta
exports.crearReceta = async (req, res) => {
  try {
    const nuevaReceta = new Receta(req.body);
    await nuevaReceta.save();
    res.status(201).json(nuevaReceta);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear receta', error });
  }
};

// Actualizar receta
exports.actualizarReceta = async (req, res) => {
  try {
    const receta = await Receta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!receta) return res.status(404).json({ message: 'Receta no encontrada' });
    res.json(receta);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar receta', error });
  }
};

// Eliminar receta
exports.eliminarReceta = async (req, res) => {
  try {
    const receta = await Receta.findByIdAndDelete(req.params.id);
    if (!receta) return res.status(404).json({ message: 'Receta no encontrada' });
    res.json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar receta', error });
  }
};
