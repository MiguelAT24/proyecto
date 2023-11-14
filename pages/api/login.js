// pages/api/login.js

import { sign } from "jsonwebtoken";
import { findUserByUsername, validatePassword } from '../../lib/auth';

export default async function handler(request, response) {
  if (request.method === "POST") {
    const { username, password} = await request.body;

    try {
      const user = await findUserByUsername(username);

      if (user && (await validatePassword(password, user.password))) {
        // Las credenciales son válidas

        // Supongamos que user.permissions contiene los permisos del usuario
        const tokenData = {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          username,
          permissions: user.permissions, // Agrega los permisos a la información del token
        };

        const token = sign(tokenData, "secret");

        response.setHeader('Set-Cookie', `myTokenName=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${1000 * 60 * 60 * 24 * 30}; Path=/`);

        // Devuelve una respuesta JSON con el token y los permisos
        return response.status(200).json({ token, permissions: user.permissions });
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
