const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const connectDB = require('./db');

// Importar rutas
const userRoutes = require('./routes/user_route');
const ejercicioRoutes = require('./routes/ejercicio_route');
const progresoRoutes = require("./routes/progreso_route");
const recetasRoutes = require("./routes/receta_route");

// Proxy de imágenes externas
const proxyRoutes = require("./proxy");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Conectar a MongoDB
connectDB();

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API REST funcionando con MongoDB Atlas 🚀');
});

// Usar rutas principales
app.use('/api/usuarios', userRoutes);
app.use('/api/ejercicios', ejercicioRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/recetas", recetasRoutes);

// Proxy de imágenes
app.use("/proxy-image", proxyRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error global:", err.stack);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Escuchar en todas las interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});
