import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener la lista de roles de usuario
    try {
      const connection = await connectToDatabase();
      const [rol] = await connection.query('SELECT * FROM rol');
      connection.end();
      res.status(200).json(rol);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de roles de usuario.' });
    }
  } else if (req.method === 'POST') {
    // Crear un nuevo rol de usuario
    try {
      const { nombre, descripcion } = req.body;

      if (!nombre || !descripcion) {
        return res.status(400).json({ error: 'Todos los campos del rol de usuario son obligatorios.' });
      }

      const connection = await connectToDatabase();
      const [result] = await connection.query(
        'INSERT INTO rol (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
      );
      connection.end();

      const newRoleId = result.insertId;

      res.status(201).json({ id: newRoleId, nombre, descripcion });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el rol de usuario.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
