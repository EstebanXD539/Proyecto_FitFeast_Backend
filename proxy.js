const express = require("express");
const axios = require("axios");
const router = express.Router();

// Ruta proxy para servir imágenes externas
router.get("/", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).send("Falta el parámetro 'url'");
    }

    // Descarga la imagen desde la URL externa
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Detecta el tipo de contenido (por defecto image/jpeg)
    const contentType = response.headers["content-type"] || "image/jpeg";
    res.set("Content-Type", contentType);

    // Devuelve la imagen al cliente
    res.send(response.data);
  } catch (err) {
    console.error("Error al cargar la imagen:", err.message);
    res.status(500).send("No se pudo cargar la imagen");
  }
});

module.exports = router;
