import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RouteList from '../pages/crud/rutas/read';


describe('VerRutas component', () => {
test('representa el componente RouteList', () => {
  render(<RouteList />);
  
  // Check if the heading "Listas de Rutas" is present
  const headingElement = screen.getByText(/Listas de Rutas/i);
  expect(headingElement).toBeInTheDocument();
});
});