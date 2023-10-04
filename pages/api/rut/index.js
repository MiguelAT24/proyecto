import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener los detalles de un viaje con la información de la ruta asociada
    try {
      const connection = await connectToDatabase();
      const viajeId = req.query.id; // Suponemos que el ID del viaje se pasa como query parameter.
      
      // Consulta SQL para obtener los detalles del viaje y la información de la ruta asociada.
      const [viajes] = await connection.query(`
        SELECT v.*, r.origen AS ruta_origen, r.destino AS ruta_destino FROM viajes v LEFT JOIN rutas r ON v.ruta = r.nombre WHERE v.id = ?;`, [viajeId]);
      
      connection.end();
      
      if (viajes.length > 0) {
        res.status(200).json(viajes[0]);
      } else {
        res.status(404).json({ error: 'Viaje no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los detalles del viaje.' });
    }
  } 
}
