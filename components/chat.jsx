import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username') || '';
    }
    return '';
  });

  const socket = io('http://localhost:4000');

  useEffect(() => {
    if (!username) {
      const user = prompt('Por favor, ingresa tu nombre de usuario:');
      setUsername(user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('username', user);
      }
    }

    socket.on('message', (data) => {
      setMessages((prevState) => [...prevState, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim().length === 0) {
      return;
    }

    socket.emit('message', { message, user: username });

    setMessage('');
  };

  return (
    <div className="container mx-auto mt-8">
      <ul className="list-disc pl-4">
        {messages.map((messageData, index) => (
          <li
            key={index}
            className={`mb-2 p-2 rounded ${
              messageData.user === username ? 'bg-green-300 text-right' : 'bg-blue-200 text-left'
            }`}
          >
            <span className={`${messageData.user === username ? 'font-bold' : ''}`}>
              {messageData.user}:
            </span>{' '}
            {messageData.message}
          </li>
        ))}
      </ul>

      <form className="mt-3" onSubmit={handleSubmit}>
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l"
            placeholder="Ingresa tu mensaje..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="px-4 py-2 bg-blue-500 rounded-r" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
