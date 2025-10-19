const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const connectDB = require('./db');

// Rutas principales
const userRoutes = require('./routes/user_route');
const ejercicioRoutes = require('./routes/ejercicio_route');
const progresoRoutes = require("./routes/progreso_route");
const recetasRoutes = require("./routes/receta_route");

// Proxy de imágenes externas
const proxyRoutes = require("./proxy");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Conectar a MongoDB
connectDB();

// Ruta raíz
app.get('/', (req, res) => {
  res.send('API REST funcionando con MongoDB Atlas');
});

// Usar rutas
app.use('/api/usuarios', userRoutes);
app.use('/api/ejercicios', ejercicioRoutes);
app.use("/api/progreso", progresoRoutes);
app.use("/api/recetas", recetasRoutes);

// Activar proxy de imágenes
app.use("/proxy-image", proxyRoutes);

// Escuchar en todas las interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${port}`);
});
