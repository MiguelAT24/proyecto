import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      // Obtener un producto por su ID
      try {
        const connection = await connectToDatabase();
        const [products] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
        connection.end();

        if (products.length > 0) {
          res.status(200).json(products[0]);
        } else {
          res.status(404).json({ error: 'Producto no encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto.' });
      }
      break;

    case 'PUT':
      // Actualizar un producto por su ID
      try {
        const connection = await connectToDatabase();
        const { nombre, id, marca, modelo, placa, asientos, capacidad, tipo_bus, adicional } = req.body;
       const updateQuery = `
        UPDATE products
        SET nombre = ?, marca = ?, modelo = ?, placa = ?, asientos = ?, capacidad = ?, tip_bus = ?, adicional = ?
        WHERE id = ?`;
        const [result] = await connection.query(updateQuery, [
        nombre,
        marca,
        modelo,
        placa,
        asientos,
        capacidad,
        tipo_bus,
        adicional,
        id, // Mantén el valor original de id sin cambios
      ]);
        connection.end();

        if (result.affectedRows > 0) {
          // Producto actualizado con éxito
          const updatedProduct = await getProductById(id);
          console.log("exito");
          res.status(200).json(updatedProduct);
        } else {
          // No se encontró el producto
          res.status(404).json({ error: 'Producto no encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto.' });
      }
      break;

      case 'DELETE': // Agrega este caso para eliminar un producto
      try {
        const connection = await connectToDatabase();
        const [result] = await connection.query('DELETE FROM products WHERE id = ?', [id]);
        connection.end();

        if (result.affectedRows > 0) {
          // Producto eliminado con éxito
          res.status(200).json({ message: 'Producto eliminado con éxito.' });
        } else {
          // No se encontró el producto
          res.status(404).json({ error: 'Producto no encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto.' });
      }
      break;

    default:
      res.status(405).json({ error: 'Método no permitido.' });
  }
}

async function getProductById(id) {
  const connection = await connectToDatabase();

  try {
    const [product] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    return product[0];
  } catch (error) {
    throw error;
  } finally {
    connection.end();
  }
}
