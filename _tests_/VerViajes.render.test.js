import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViajeList from '../pages/crud/viaje/read';



describe('VerViaje Component', () => {
test('renderiza el componente ViajeList', () => {
  render(<ViajeList/>);
  
  // Check if the heading "Lista de Programación de Viajes" is present
  const headingElement = screen.getByText(/Lista de Programación de Viajes/i);
  expect(headingElement).toBeInTheDocument();

  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeInTheDocument();
});
});