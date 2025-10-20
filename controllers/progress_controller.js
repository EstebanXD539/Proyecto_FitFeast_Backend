const Progress = require("../models/progress_model");

// Obtener progreso del usuario
exports.getProgress = async (req, res) => {
  try {
    let progreso = await Progress.findOne({ userId: req.userId });

    if (!progreso) {
      // Si no existe, lo creamos con valores por defecto
      progreso = new Progress({ userId: req.userId });
      await progreso.save();
    }

    res.json(progreso);
  } catch (error) {
    console.error("Error al obtener progreso:", error);
    res.status(500).json({ error: "Error al obtener progreso" });
  }
};

// Actualizar progreso (comida o ejercicio)
exports.updateProgress = async (req, res) => {
  try {
    const { comida, ejercicio, objetivo } = req.body;

    const progreso = await Progress.findOneAndUpdate(
      { userId: req.userId },
      { $set: { comida, ejercicio, objetivo } },
      { new: true, upsert: true }
    );

    res.json(progreso);
  } catch (error) {
    console.error("Error al actualizar progreso:", error);
    res.status(500).json({ error: "Error al actualizar progreso" });
  }
};
