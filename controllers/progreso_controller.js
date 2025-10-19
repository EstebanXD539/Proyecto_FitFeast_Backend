const Progreso = require("../models/progreso_model");

// Crear un progreso (ej. al registrarse el usuario)
exports.createProgreso = async (req, res) => {
  try {
    const { objetivo, comida, ejercicio } = req.body;
    const progreso = new Progreso({
      userId: req.userId, // viene del middleware auth
      objetivo,
      comida,
      ejercicio
    });
    await progreso.save();
    res.status(201).json(progreso);
  } catch (error) {
    res.status(500).json({ error: "Error al crear progreso" });
  }
};

// Obtener progreso actual del usuario
exports.getProgreso = async (req, res) => {
  try {
    const progreso = await Progreso.findOne({ userId: req.userId })
      .sort({ fecha: -1 }); // último registro
    if (!progreso) return res.status(404).json({ error: "No hay progreso" });
    res.json(progreso);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener progreso" });
  }
};

// Actualizar progreso (ej. sumar comida o ejercicio)
exports.updateProgreso = async (req, res) => {
  try {
    const { comida, ejercicio } = req.body;
    const progreso = await Progreso.findOneAndUpdate(
      { userId: req.userId },
      { $inc: { comida: comida || 0, ejercicio: ejercicio || 0 } },
      { new: true }
    ).sort({ fecha: -1 });
    res.json(progreso);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar progreso" });
  }
};
