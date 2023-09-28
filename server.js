// server.js
import express from 'express';
import next from 'next';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { findUserByUsername, validatePassword } from './lib/auth';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());
  server.use(session({ secret: 'mi_secreto', resave: false, saveUninitialized: true }));

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isValid = await validatePassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
   

    req.session.user = user;

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Listo en http://localhost:3000');
  });
});
