import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener la lista de roles
    try {
      const connection = await connectToDatabase();
      const [personal] = await connection.query('SELECT * FROM users');
      connection.end();
      res.status(200).json(personal);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de roles.' });
    }
  } else if (req.method === 'POST') {
    // Crear un nuevo registro de personal
    try {
      const {
        nombre,
        apellido,
        correo,
        rol,
        telefono,
        direccion,
        dni,
        ciudad,
        pais,
        user,
        password,
      } = req.body;

      if (
        !nombre ||
        !apellido ||
        !correo ||
        !rol ||
        !telefono ||
        !direccion ||
        !dni ||
        !ciudad ||
        !pais ||
        !user ||
        !password 
      ) {
        return res.status(400).json({ error: 'Todos los campos del personal son obligatorios.' });
      }

      const connection = await connectToDatabase();
      const [result] = await connection.query(
        'INSERT INTO users (nombre, apellido, correo, rol, telefono, direccion, ci, ciudad, pais, user, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          nombre,
          apellido,
          correo,
          rol,
          telefono,
          direccion,
          dni,
          ciudad,
          pais,
          user,
          password,
        ]
      );
      connection.end();

      const newPersonalId = result.insertId;

      res.status(201).json({
        id: newPersonalId,
        nombre,
        apellido,
        correo,
        rol,
        telefono,
        direccion,
        dni,
        ciudad,
        pais,
        user,
        password,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el registro de personal.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
