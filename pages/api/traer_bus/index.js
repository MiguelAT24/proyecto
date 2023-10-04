import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Obtener la lista de asignaciones de bus
    try {
      const connection = await connectToDatabase();
      const [asignaciones] = await connection.query('SELECT * FROM asignar_bus');
      connection.end();
      res.status(200).json(asignaciones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de asignaciones de bus.' });
    }
  } 
}
