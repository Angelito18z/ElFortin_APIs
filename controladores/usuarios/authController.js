import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../modelos/usuarios/usuariosModel.js';

export const login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  // Validate the presence of both emailOrUsername and password
  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: 'Correo o nombre de usuario y contraseña son requeridos.' });
  }

  try {
    // Use the method from the User class to fetch the user by email or username
    const user = await User.getUserByEmailOrUsername({ emailOrUsername });

    if (!user) {
      return res.status(404).json({ message: 'Usuario o correo no encontrado.' });
    }

    // Compare the provided password with the encrypted password from the database
    const passwordMatch = await bcrypt.compare(password, user.encrypted_password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Generate a JWT token with user info (you can include more fields if needed)
    const token = jwt.sign(
      { id: user.id, username: user.nickname, email: user.email },
      process.env.JWT_SECRET,  // Ensure this is defined in your environment
      { expiresIn: process.env.JWT_EXPIRES || '1h' }  // Default to 1 hour if not set
    );

    // Return the token in the response
    res.status(200).json({ message: 'Log In exitoso.', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
