// pages/api/logout.js
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { serialize } from "swr/_internal";

export default function handler(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return NextResponse.json(
      {
        message: "Not logged in",
      },
      {
        status: 401,
      }
    );
  }

  try {
    verify(myTokenName, "secret");

    const serialized = serialize("myTokenName", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });

    // Elimina la cookie estableciendo su valor como una cadena vacía y una fecha de expiración pasada
    res.setHeader(
      "Set-Cookie",
      `myTokenName=; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`
    );

    // Envía una respuesta al cliente
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    // Manejar errores si es necesario

    // Envía una respuesta de error al cliente
    return res.status(500).json({
      message: "Error during logout",
    });
  }
}
