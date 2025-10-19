const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user_controller");
const auth = require("../middlewares/auth");

// Rutas públicas
router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);

// Rutas protegidas
router.get("/profile", auth, userCtrl.getProfile);
router.put("/update", auth, userCtrl.updateUser);
router.delete("/delete", auth, userCtrl.deleteUser);

module.exports = router;
