const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },

    // Nuevos campos para tu app
    edad: { type: Number, default: 0 },
    altura: { type: Number, default: 0 }, // en cm
    peso: { type: Number, default: 0 },   // en kg
  },
  { timestamps: true }
);

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next(); // evita re-hash si no cambió
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas en login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
