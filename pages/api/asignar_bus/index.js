// pages/api/buses/index.js
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener la lista de autobuses
    try {
      const connection = await connectToDatabase();
      const [personal] = await connection.query('SELECT * FROM personal WHERE rol = "chofer"');
      connection.end();
      res.status(200).json(personal);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de choferes.' });
    }
  }
  
  else if (req.method === 'POST') {
    // Crear un nuevo autobús
    try {
      const { chofer, relevo, bus } = req.body;

      if (!chofer || !relevo || !bus) {
        return res.status(400).json({ error: 'Todos los campos del autobús son obligatorios.' });
      }

      const connection = await connectToDatabase();
      const [result] = await connection.query(
        'INSERT INTO asignar_bus (chofer, relevo, bus) VALUES (?, ?, ?)',
        [chofer, relevo, bus]
      );
      connection.end();

      const newAsigId = result.insertId;

      res.status(201).json({ id: newAsigId, chofer, relevo, bus });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el autobús.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
