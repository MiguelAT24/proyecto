import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      // Obtener una ruta por su ID
      try {
        const connection = await connectToDatabase();
        const [rutas] = await connection.query('SELECT * FROM rutas WHERE id = ?', [id]);
        connection.end();

        if (rutas.length > 0) {
          res.status(200).json(rutas[0]);
        } else {
          res.status(404).json({ error: 'Ruta no encontrada.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener la ruta.' });
      }
      break;

    case 'PUT':
      // Actualizar una ruta por su ID
      try {
        const connection = await connectToDatabase();
        const { nombre, origen, destino, duracion } = req.body;
       const updateQuery = `UPDATE rutas SET nombre = ?, origen = ?, destino = ?, duracion = ? WHERE id = ?`;
        const [result] = await connection.query(updateQuery, [
          nombre, 
          origen, 
          destino, 
          duracion,
          id,
      ]);
        connection.end();

        if (result.affectedRows > 0) {
          // Ruta actualizada con éxito
          const updatedRoute = await getRouteById(id);
          res.status(200).json(updatedRoute);
        } else {
          // No se encontró la ruta
          res.status(404).json({ error: 'Ruta no encontrada.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la ruta.' });
      }
      break;

    case 'DELETE': // Agrega este caso para eliminar una ruta
      try {
        const connection = await connectToDatabase();
        const [result] = await connection.query('DELETE FROM rutas WHERE id = ?', [id]);
        connection.end();

        if (result.affectedRows > 0) {
          // Ruta eliminada con éxito
          res.status(200).json({ message: 'Ruta eliminada con éxito.' });
        } else {
          // No se encontró la ruta
          res.status(404).json({ error: 'Ruta no encontrada.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la ruta.' });
      }
      break;

    default:
      res.status(405).json({ error: 'Método no permitido.' });
  }
}

async function getRouteById(id) {
  const connection = await connectToDatabase();

  try {
    const [route] = await connection.query('SELECT * FROM rutas WHERE id = ?', [id]);
    return route[0];
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
}
