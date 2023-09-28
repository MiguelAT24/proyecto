// db.js
import { createConnection } from 'mysql2/promise';

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: 'localhost', // Cambia esto si es necesario
  user: 'root', // Cambia esto si es necesario
  password: '', // Cambia esto si es necesario
  database: 'nextlogin', // Cambia esto si es necesario
};

export async function connectToDatabase() {
  const connection = await createConnection(dbConfig);
  return connection;
}