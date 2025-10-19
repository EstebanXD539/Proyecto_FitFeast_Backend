const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI no está definido en el entorno');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('Error en la conexión a MongoDB:', err.message);
    process.exit(1); // Detiene el servidor si falla la conexión
  }
};

module.exports = connectDB;
