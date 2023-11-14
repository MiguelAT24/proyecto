import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener la lista de viajes
    try {
      const connection = await connectToDatabase();
      const [viajes] = await connection.query('SELECT * FROM viajes');
      connection.end();
      res.status(200).json(viajes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de viajes.' });
    }
  } 
  else if (req.method === 'POST') {
    // Crear un nuevo registro de viaje
    try {
      const {
        fecha, horaSalida, horaLlegada, ruta, origen, destino, bus, servicio, precio,
      } = req.body;

      if (
        !fecha ||
        !horaSalida ||
        !horaLlegada ||
        !ruta ||
        !origen ||
        !destino ||
        !bus ||
        !servicio ||
        !precio
      ) {
        return res.status(400).json({ error: 'Todos los campos del viaje son obligatorios.' });
      }

      const connection = await connectToDatabase();
      const [result] = await connection.query(
        'INSERT INTO viajes (fecha, ho_sa, ho_lle, ruta, origen, destino, bus, servicio, precio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          fecha, horaSalida, horaLlegada, ruta, origen, destino, bus, servicio, precio,
        ]
      );
      connection.end();

      const newViajeId = result.insertId;

      res.status(201).json({
        id: newViajeId,
        fecha, horaSalida, horaLlegada, ruta, origen, destino, bus, servicio, precio,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el registro de viaje.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
