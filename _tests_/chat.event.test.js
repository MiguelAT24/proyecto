import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chat from '../components/chat';

// Mocking window.prompt
global.window.prompt = jest.fn(() => 'TuNombreDeUsuario');

describe('Chat Component', () => {
  test('representa los mensajes de chat correctamente', () => {
    const initialMessages = [
      { user: 'User1', message: 'Hola, ¿cómo estás?' },
    ];

    render(<Chat initialMessages={initialMessages} />);


    const messageInput = screen.getByPlaceholderText('Ingresa tu mensaje...');
    const sendButton = screen.getByText('Enviar');

    fireEvent.change(messageInput, { target: { value: 'Hola, ¿qué tal?' } });
    fireEvent.click(sendButton);

  });
});
