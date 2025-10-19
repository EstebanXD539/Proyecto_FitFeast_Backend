const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { createProgreso, getProgreso, updateProgreso } = require("../controllers/progreso_controller");

router.post("/", auth, createProgreso);
router.get("/", auth, getProgreso);
router.put("/", auth, updateProgreso);

module.exports = router;
