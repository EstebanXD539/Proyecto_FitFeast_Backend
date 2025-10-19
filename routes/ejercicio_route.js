const express = require('express');
const router = express.Router();
const Ejercicio = require('../models/ejercicio_model');

// GET all
router.get('/', async (req, res) => {
  try {
    const ejercicios = await Ejercicio.find();
    res.json(ejercicios);
  } catch (err) {
    res.status(500).send('Error al obtener ejercicios');
  }
});

// GET by ID
router.get('/id/:id', async (req, res) => {
  try {
    const ejercicio = await Ejercicio.findById(req.params.id);
    if (!ejercicio) return res.status(404).send('Ejercicio no encontrado');
    res.json(ejercicio);
  } catch (err) {
    res.status(500).send('Error al obtener ejercicio');
  }
});

// GET by categoría
router.get('/categoria/:categoria', async (req, res) => {
  try {
    const ejercicios = await Ejercicio.find({ categoria: req.params.categoria });
    res.json(ejercicios);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener ejercicios" });
  }
});

// POST (crear)
router.post('/', async (req, res) => {
  try {
    const nuevo = new Ejercicio(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).send('Error al crear ejercicio: ' + err.message);
  }
});

// PUT (actualizar)
router.put('/id/:id', async (req, res) => {
  try {
    const actualizado = await Ejercicio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actualizado) return res.status(404).send('Ejercicio no encontrado');
    res.json(actualizado);
  } catch (err) {
    res.status(400).send('Error al actualizar ejercicio: ' + err.message);
  }
});

// DELETE
router.delete('/id/:id', async (req, res) => {
  try {
    const eliminado = await Ejercicio.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).send('Ejercicio no encontrado');
    res.json({ mensaje: 'Ejercicio eliminado', id: eliminado._id });
  } catch (err) {
    res.status(500).send('Error al eliminar ejercicio');
  }
});

module.exports = router;
