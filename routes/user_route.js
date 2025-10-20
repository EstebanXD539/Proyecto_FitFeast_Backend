const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user_controller");
const auth = require("../middlewares/auth");

// Rutas públicas
router.post("/register", userCtrl.register); // acepta name, email, password, edad, altura, peso
router.post("/login", userCtrl.login);

// Rutas protegidas (requieren token JWT)
router.get("/profile", auth, userCtrl.getProfile); // devuelve datos del usuario sin password
router.get("/progreso", auth, userCtrl.getProgreso);
router.put("/update", auth, userCtrl.updateUser);  // permite actualizar name, email, password, edad, altura, peso
router.delete("/delete", auth, userCtrl.deleteUser);

module.exports = router;
