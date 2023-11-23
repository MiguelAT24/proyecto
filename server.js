const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your Next.js application origin
  },
});


io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('message', (message) => {
    io.emit('message', {
      user: socket.id,
      message: message,
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
