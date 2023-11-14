import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { usuario, permisos } = req.body;

      const db = await connectToDatabase(); // Utiliza tu función de conexión a la base de datos.

      // Implementa la lógica SQL para asignar permisos al usuario.
      const insertQuery = 'INSERT INTO usuarios_permisos (usuario_id, permiso_id) VALUES ?';

      const values = permisos.map((permiso) => [usuario, permiso]);

      db.query(insertQuery, [values], (err, results) => {
        if (err) {
          console.error('Error al asignar permisos:', err);
          res.status(500).json({ error: 'Error al asignar permisos' });
        } else {
          console.log('Permisos asignados con éxito');
          res.status(200).json({ mensaje: 'Permisos asignados con éxito' });
        }
      });
    } catch (error) {
      console.error('Error al asignar permisos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
