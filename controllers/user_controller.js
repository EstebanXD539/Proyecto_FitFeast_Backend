const User = require("../models/user_model");
const Progress = require("../models/progress_model");
const jwt = require("jsonwebtoken");

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password, edad, altura, peso } = req.body;

    // Validar si ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Crear nuevo usuario
    const newUser = new User({
      name,
      email,
      password,
      edad: edad || 0,
      altura: altura || 0,
      peso: peso || 0,
    });

    await newUser.save();

    // Crear documento de progreso asociado automáticamente
    const newProgress = new Progress({
      userId: newUser._id,
      objetivo: 1500,
      comida: 0,
      ejercicio: 0,
    });
    await newProgress.save();

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        edad: newUser.edad,
        altura: newUser.altura,
        peso: newUser.peso,
      },
      progreso: newProgress,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error en el registro" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // Comparar contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Credenciales inválidas" });

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "claveTemporal",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        edad: user.edad,
        altura: user.altura,
        peso: user.peso,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el login" });
  }
};

// Obtener perfil (requiere autenticación)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};

// Obtener progreso del usuario
exports.getProgreso = async (req, res) => {
  try {
    let progreso = await Progress.findOne({ userId: req.userId });

    // Si no existe, lo creamos en caliente
    if (!progreso) {
      progreso = new Progress({
        userId: req.userId,
        objetivo: 1500,
        comida: 0,
        ejercicio: 0,
      });
      await progreso.save();
    }

    res.json(progreso);
  } catch (error) {
    console.error("Error al obtener progreso:", error);
    res.status(500).json({ error: "Error al obtener progreso" });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, edad, altura, peso } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password; // se re-encripta en pre('save')
    if (edad !== undefined) updateData.edad = edad;
    if (altura !== undefined) updateData.altura = altura;
    if (peso !== undefined) updateData.peso = peso;

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.userId);
    if (!deletedUser) return res.status(404).json({ error: "Usuario no encontrado" });

    // Eliminar también su progreso
    await Progress.findOneAndDelete({ userId: req.userId });

    res.json({ message: "Usuario y progreso eliminados" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
