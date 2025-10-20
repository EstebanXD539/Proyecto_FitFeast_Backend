const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const progressController = require("../controllers/progress_controller");

// Obtener progreso actual del usuario
router.get("/", authMiddleware, progressController.getProgreso);

// Registrar comida (calorías consumidas)
router.post("/registrarComida", authMiddleware, progressController.registrarComida);

// Registrar ejercicio (calorías quemadas)
router.post("/registrarEjercicio", authMiddleware, progressController.registrarEjercicio);

module.exports = router;
