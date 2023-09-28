import session from 'express-session';
import { findUserByUsername, validatePassword } from '../../lib/auth';

const sessionMiddleware = session({
  secret: 'tu_secreto_secreto', // Cambia esto por una cadena secreta segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Cambia a true si estás usando HTTPS
});

export default async (req, res) => {
    if (req.method === 'POST') {
      const { username, password } = req.body;
  
      try {
        // Buscar el usuario en la base de datos
        const user = await findUserByUsername(username);
  
        if (!user) {
          return res.status(401).json({ message: 'Usuario no encontrado' });
        }
  
        // Validar la contraseña
        const isValid = await validatePassword(password, user.password);
  
        if (!isValid) {
          console.log('error');
          return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
  
        // Asegúrate de que req.session esté inicializado antes de establecer req.session.user
        if (!req.session) {
          req.session = {};
        }
  
        req.session.user = user;
         
        // Responder con un mensaje de inicio de sesión exitoso
        console.log('exito');
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } catch (error) {
        console.log('error');
        console.error('Error de inicio de sesión:', error);
        return res.status(500).json({ message: 'Error de inicio de sesión' });
      }
    } else {
      // Si la solicitud no es un método POST, responder con un error 405 (Método no permitido)
      return res.status(405).end();
    }
  };