import { connectToDatabase } from './db';
import crypto from 'crypto';

// Función para buscar un usuario por su nombre de usuario en la base de datos
export async function findUserByUsername(username) {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute('SELECT * FROM users WHERE user = ?', [username]);
    console.log('Resultado de la consulta a la base de datos:', rows);
  

    if (rows.length === 0) {
      connection.end();
      return null; // El usuario no existe en la base de datos
    }

    const userId = rows[0].id;

    const [permissionsRows] = await connection.execute(
      'SELECT p.nombre_permiso FROM permisos p JOIN usuarios_permisos up ON p.id = up.permiso_id WHERE up.usuario_id = ?',
      [userId]
    );
    console.log('Resultado de la consulta de permisos a la base de datos:', permissionsRows);

    connection.end();

    return {
      id: rows[0].id,
      username: rows[0].user,
      password: rows[0].password,
      permissions: permissionsRows.map(permiso => permiso.nombre_permiso),
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
