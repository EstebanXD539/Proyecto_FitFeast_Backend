const Progress = require("../models/progress_model");

// Obtener progreso actual del usuario
exports.getProgreso = async (req, res) => {
  try {
    let progreso = await Progress.findOne({ userId: req.userId });

    // Si no existe, lo creamos con valores por defecto
    if (!progreso) {
      progreso = new Progress({
        userId: req.userId,
        objetivo: 1500,
        comida: 0,
        ejercicio: 0,
      });
      await progreso.save();
    }

    res.json(progreso);
  } catch (error) {
    console.error("Error al obtener progreso:", error);
    res.status(500).json({ error: "Error al obtener progreso" });
  }
};

// Registrar comida (sumar calorías consumidas)
exports.registrarComida = async (req, res) => {
  try {
    const { calorias } = req.body;
    if (!calorias) {
      return res.status(400).json({ error: "Debes enviar las calorías" });
    }

    let progreso = await Progress.findOne({ userId: req.userId });
    if (!progreso) {
      progreso = new Progress({
        userId: req.userId,
        objetivo: 1500,
        comida: 0,
        ejercicio: 0,
      });
    }

    progreso.comida += calorias;
    await progreso.save();

    res.json({
      message: "Calorías registradas correctamente",
      progreso,
    });
  } catch (error) {
    console.error("Error al registrar comida:", error);
    res.status(500).json({ error: "Error al registrar comida" });
  }
};

// Registrar ejercicio (sumar calorías quemadas)
exports.registrarEjercicio = async (req, res) => {
  try {
    const { calorias } = req.body;
    if (!calorias) {
      return res.status(400).json({ error: "Debes enviar las calorías" });
    }

    let progreso = await Progress.findOne({ userId: req.userId });
    if (!progreso) {
      progreso = new Progress({
        userId: req.userId,
        objetivo: 1500,
        comida: 0,
        ejercicio: 0,
      });
    }

    progreso.ejercicio += calorias;
    await progreso.save();

    res.json({
      message: "Ejercicio registrado correctamente",
      progreso,
    });
  } catch (error) {
    console.error("Error al registrar ejercicio:", error);
    res.status(500).json({ error: "Error al registrar ejercicio" });
  }
};
