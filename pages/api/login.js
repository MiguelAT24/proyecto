// pages/api/login.js

import { sign } from "jsonwebtoken";
import { findUserByUsername, validatePassword } from '../../lib/auth';


export default async function handler(request, response) {
  if (request.method === "POST") {
    const { username, password } = await request.body;

    try {
      const user = await findUserByUsername(username);

      if (user && (await validatePassword(password, user.password))) {
        // Las credenciales son válidas
        // Coloca tu lógica de generación de token aquí

        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            username,
          },
          "secret"
        );

        response.setHeader('Set-Cookie', `myTokenName=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${1000 * 60 * 60 * 24 * 30}; Path=/`);
        
        return response.status(200).json({ token }); // Devolver una respuesta JSON y establecer el estado de la respuesta
      } else {
        return response.status(401).json({
          message: "Credenciales inválidas",
        });
      }
    } catch (error) {
      console.error("Error al autenticar al usuario:", error);
      return response.status(500).json({ error: "Error al autenticar al usuario" });
    }
  } else {
    // Maneja otros métodos HTTP si es necesario
    return response.status(405).json({ error: "Método HTTP no admitido" });
  }
}