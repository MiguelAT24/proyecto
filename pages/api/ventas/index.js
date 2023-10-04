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
  } else if (req.method === 'POST') {
    // Crear una nueva venta de asiento
    try {
      const {
        nombre,
        cedulaIdentidad,
        origen,
        destino,
        fecha,
        asientoSeleccionado,
        serie,
        precio,
        vendidoPor,
      } = req.body;

      if (
        !nombre ||
        !cedulaIdentidad ||
        !origen ||
        !destino ||
        !fecha ||
        !asientoSeleccionado ||
        !serie ||
        !precio ||
        !vendidoPor
      ) {
        return res.status(400).json({ error: 'Todos los campos de la venta de asiento son obligatorios.' });
      }

      // Verifica si el asiento ya ha sido vendido u ocupado antes de registrar la venta
      const connection = await connectToDatabase();
      const [existingVenta] = await connection.query(
        'SELECT * FROM ventas WHERE asiento = ? AND vendido != "libre"',
        [asientoSeleccionado]
      );

      if (existingVenta.length > 0) {
        return res.status(400).json({ error: 'Este asiento ya ha sido vendido u ocupado.' });
      }

      // Registra la venta de asiento como "ocupado"
      const [result] = await connection.query(
        'INSERT INTO ventas (nombre, ci, origen, destino, fecha, asiento, serie, precio, emitido_por, vendido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "ocupado")',
        [
          nombre,
          cedulaIdentidad,
          origen,
          destino,
          fecha,
          asientoSeleccionado,
          serie,
          precio,
          vendidoPor,
        ]
      );
      connection.end();

      const nuevaVentaId = result.insertId;

      res.status(201).json({
        id: nuevaVentaId,
        nombre,
        cedulaIdentidad,
        origen,
        destino,
        fecha,
        asientoSeleccionado,
        serie,
        precio,
        vendidoPor,
        vendido: 'ocupado',
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la venta de asiento.' });
    }
  } else if (req.method === 'DELETE') {
    // Agregar una ruta para liberar un asiento vendido
    try {
      const { id } = req.body;

      const connection = await connectToDatabase();
      const [venta] = await connection.query('SELECT * FROM ventas WHERE id = ?', [id]);

      if (venta.length === 0) {
        return res.status(404).json({ error: 'Venta de asiento no encontrada.' });
      }

      // Verifica si la venta está en un estado que se puede liberar (por ejemplo, "ocupado")
      if (venta[0].estado === 'ocupado') {
        // Actualiza el estado del asiento a "libre" y elimina la venta
        await connection.query('UPDATE ventas SET vendido = "libre" WHERE id = ?', [id]);
        connection.end();

        res.status(200).json({ message: 'Asiento liberado exitosamente.' });
      } else {
        res.status(400).json({ error: 'No se puede liberar este asiento.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al liberar el asiento.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido.' });
  }
}
