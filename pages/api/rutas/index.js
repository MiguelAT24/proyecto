// pages/api/buses/index.js
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener la lista de rutas
    try {
      const connection = await connectToDatabase();
      const [rutas] = await connection.query('SELECT * FROM rutas');
      connection.end();
      res.status(200).json(rutas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de autobuses.' });
    }
  }
  
  else if (req.method === 'POST') {
    // Crear un nuevo autobús
    try {
      const { nombre, origen, destino, duracion} = req.body;

      if (!nombre || !origen || !destino || !duracion ) {
        return res.status(400).json({ error: 'Todos los campos del autobús son obligatorios.' });
      }

      const connection = await connectToDatabase();
      const [result] = await connection.query(
        'INSERT INTO rutas (nombre, origen, destino, duracion) VALUES (?, ?, ?, ?)',
        [nombre, origen, destino, duracion]
      );
      connection.end();

      const newRutId = result.insertId;

      res.status(201).json({ id: newRutId, nombre, origen, destino, duracion});
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la ruta.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
