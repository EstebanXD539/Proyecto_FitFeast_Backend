const express = require("express");
const router = express.Router();
const progressCtrl = require("../controllers/progress_controller");
const auth = require("../middlewares/auth");

router.get("/", auth, progressCtrl.getProgress);
router.put("/", auth, progressCtrl.updateProgress);

module.exports = router;
