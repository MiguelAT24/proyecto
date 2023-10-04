import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener la lista de ventas de asientos
    try {
      const connection = await connectToDatabase();
      const [ventas] = await connection.query('SELECT * FROM ventas');
      connection.end();
      res.status(200).json(ventas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de ventas de asientos.' });
    }
  }
}
