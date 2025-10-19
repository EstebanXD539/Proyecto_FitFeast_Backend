const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/receta_controller');

router.get('/', recetaController.obtenerRecetas);
router.get('/:id', recetaController.obtenerRecetaPorId);
router.post('/', recetaController.crearReceta);
router.put('/:id', recetaController.actualizarReceta);
router.delete('/:id', recetaController.eliminarReceta);

module.exports = router;
