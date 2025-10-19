const User = require("../models/user_model");
const jwt = require("jsonwebtoken");

// Registrar usuario
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar si ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Crear nuevo usuario (la contraseña se encripta en el pre('save') del modelo)
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
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

    res.status(200).json({ token });
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

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) updateData.password = password; // se re-encripta en pre('save')

    const updatedUser = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
      runValidators: true,
    });

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

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
