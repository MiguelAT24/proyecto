import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BusList from '../pages/crud/bus/read';



describe('VerBus component', () => {
test('representa el componente BusList', () => {
  render(<BusList />);
  
  // Check if the heading "Listas de Buses" is present
  const headingElement = screen.getByText(/Listas de Buses/i);
  expect(headingElement).toBeInTheDocument();
});
});