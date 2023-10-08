import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      // Obtener un viaje por su ID
      try {
        const connection = await connectToDatabase();
        const [viajes] = await connection.query('SELECT * FROM viajes WHERE id = ?', [id]);
        connection.end();

        if (viajes.length > 0) {
          res.status(200).json(viajes[0]);
        } else {
          res.status(404).json({ error: 'Viaje no encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener el viaje.' });
      }
      break;

    case 'PUT':
      // Actualizar un viaje por su ID
      try {
        const connection = await connectToDatabase();
        const {fecha,horaSalida,horaLlegada,ruta,origen,destino,bus,servicio,precio,} = req.body;

        const updateQuery = `UPDATE viajes SET fecha = ?, ho_sa = ?, ho_lle = ?, ruta = ?, origen = ?, destino = ?, bus = ?, servicio = ?, precio = ?
          WHERE id = ?`;

        const [result] = await connection.query(updateQuery, [
          fecha,
          horaSalida,
          horaLlegada,
          ruta,
          origen,
          destino,
          bus,
          servicio,
          precio,
          id,
        ]);

        connection.end();

        if (result.affectedRows > 0) {
          // Viaje actualizado con éxito
          const updatedViaje = await getViajeById(id);
          res.status(200).json(updatedViaje);
        } else {
          // No se encontró el viaje
          res.status(404).json({ error: 'Viaje no encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el viaje.' });
      }
      break;

    case 'DELETE': // Agrega este caso para eliminar un viaje
      try {
        const connection = await connectToDatabase();
        const [result] = await connection.query('DELETE FROM viajes WHERE id = ?', [id]);
        connection.end();

        if (result.affectedRows > 0) {
          // Viaje eliminado con éxito
          res.status(200).json({ message: 'Viaje eliminado con éxito.' });
        } else {
          // No se encontró el viaje
          res.status(404).json({ error: 'Viaje no encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el viaje.' });
      }
      break;

    default:
      res.status(405).json({ error: 'Método no permitido.' });
  }
}

async function getViajeById(id) {
  const connection = await connectToDatabase();

  try {
    const [viaje] = await connection.query('SELECT * FROM viajes WHERE id = ?', [id]);
    return viaje[0];
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
}
