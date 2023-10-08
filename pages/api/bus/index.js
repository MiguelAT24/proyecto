// pages/api/buses/index.js
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener la lista de autobuses
    try {
      const connection = await connectToDatabase();
      const [products] = await connection.query('SELECT * FROM bus');
      connection.end();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de autobuses.' });
    }
  }
  
  else if (req.method === 'POST') {
    // Crear un nuevo autobús
    try {
      const { nombre, identificacion, marca, modelo, placa, asiento, capacidad, tipo_bus, notas } = req.body;

      if (!nombre || !identificacion || !marca || !modelo || !placa || !asiento || !capacidad || !tipo_bus) {
        return res.status(400).json({ error: 'Todos los campos del autobús son obligatorios.' });
      }

      const connection = await connectToDatabase();
      const [result] = await connection.query(
        'INSERT INTO bus (nombre, id, marca, modelo, placa, asientos, capacidad, tip_bus, adicional) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, identificacion, marca, modelo, placa, asiento, capacidad, tipo_bus, notas]
      );
      connection.end();

      const newBusId = result.insertId;

      res.status(201).json({ id: newBusId, nombre, identificacion, marca, modelo, placa, asiento, capacidad, tipo_bus, notas });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el autobús.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
