import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const socket = io('http://localhost:4000');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevState) => [...prevState, data]);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className="chat">
      <ul>
        {messages.map((message) => (
          <li key={message.user}>
            {message.user}: {message.message}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
