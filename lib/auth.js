import { connectToDatabase } from './db';
import crypto from 'crypto';

// Función para buscar un usuario por su nombre de usuario en la base de datos
export async function findUserByUsername(username) {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM users WHERE user = ?', [username]);
    console.log('Resultado de la consulta a la base de datos:', rows);
    connection.end();

    if (rows.length === 0) {
      return null; // El usuario no existe en la base de datos
    }

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

// Función para validar la contraseña proporcionada con la contraseña almacenada en MD5
export function validatePassword(password, storedPassword) {
  try {
    const hashedInputPassword = crypto.createHash('md5').update(password).digest('hex');
    const passwordMatch = hashedInputPassword === storedPassword;
    return passwordMatch;
  } catch (error) {
    console.error('Error al validar la contraseña:', error);
    throw error;
  }
}
