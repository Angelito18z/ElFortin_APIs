import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../modelos/usuarios/usuariosModel.js';
import { use } from 'chai';

export const login = async (req, res) => {
  const { emailOrNickname, password } = req.body;

  // Validate the presence of both emailOrUsername and password
  if (!emailOrNickname || !password) {
    return res.status(400).json({ message: 'Correo o nombre de usuario y contraseña son requeridos.' });
  }

  try {
    // Use the method from the User class to fetch the user by email or username
    const user = await User.getUserByEmailOrUsername({ emailOrNickname });

    if (!user) {
      return res.status(404).json({ message: 'Usuario o correo no encontrado.' });
    }

    // Compare the provided password with the encrypted password from the database
    // Compara la contraseña desencriptada
    if (user.decrypted_password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

     // Generar el token JWT
     const token = jwt.sign(
      {
        id: user.id,
        username: user.nickname,
        email: user.email,
        role: user.user_type || 'client', // Incluye el rol si está disponible
      },
      process.env.JWT_SECRET, // Asegúrate de que esta clave esté configurada
      { expiresIn: process.env.JWT_EXPIRES || '30m' } // Por defecto expira en 1 hora
    );

    // Return the token in the response
    res.status(200).json({ message: 'Log In exitoso.', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
