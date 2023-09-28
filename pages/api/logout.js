// pages/api/logout.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Verifica si req.session está definida
        if (!req.session) {
          console.error('Sesión no inicializada');
          return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
  
        // Destruye la sesión del usuario
        req.session.destroy((err) => {
          if (err) {
            console.error('Error al cerrar la sesión:', err);
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
          }
  
          // Responde con un mensaje de cierre de sesión exitoso
          console.log('Cierre de sesión exitoso');
          return res.status(200).json({ message: 'Cierre de sesión exitoso' });
        });
      } catch (error) {
        console.error('Error al cerrar la sesión:', error);
        return res.status(500).json({ message: 'Error al cerrar la sesión' });
      }
    } else {
      // Si la solicitud no es un método POST, responder con un error 405 (Método no permitido)
      return res.status(405).end();
    }
  }
  