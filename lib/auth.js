
// lib/auth.js
import bcrypt from 'bcryptjs';
import { connectToDatabase } from './db'; // Importar la función de conexión a la base de datos

// Función para buscar un usuario por su nombre de usuario en la base de datos
export async function findUserByUsername(username) {
  try {
    const connection = await connectToDatabase(); // Usar la función de conexión
    const [rows] = await connection.execute('SELECT * FROM users WHERE user = ?', [username]);
    console.log('Resultado de la consulta a la base de datos:', rows);
    connection.end();

    if (rows.length === 0) {
      return null; // El usuario no existe en la base de datos
    }
    
    console.log('Usuario encontrado en la base de datos:', rows[0]);
    return {
      id: rows[0].id,
      username: rows[0].user,
      password: rows[0].password,
    };
  } catch (error) {
    console.error('Error al buscar el usuario en la base de datos:', error);
    throw error;
  }
}

// Función para validar la contraseña proporcionada con la contraseña almacenada
export async function validatePassword(password, storedPassword) {
  try {
    // Comparar la contraseña en texto plano con la contraseña almacenada en la base de datos
    const passwordMatch = password === storedPassword;
    return passwordMatch;
  } catch (error) {
    console.error('Error al validar la contraseña:', error);
    throw error;
  }
}