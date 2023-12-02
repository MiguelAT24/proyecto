const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000', 
  },
});

io.on('connection', (socket) => {

  socket.on('message', (data) => {
    console.log('Mensaje recibido:', data);
    io.emit('message', {
      user: data.user, // Utilizar el nombre de usuario proporcionado por el cliente
      message: data.message,
    });
  });

  socket.on('disconnect', () => {
  });
});

server.listen(4000, () => {
  console.log('Servidor escuchando en el puerto 4000');
});
