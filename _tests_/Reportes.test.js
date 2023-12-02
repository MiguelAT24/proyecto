import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Reportes from '../pages/reportes/reporte';

// Mockear la función fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
  })
);
//prueb ad renderizado
describe('Componente de Reportes', () => {
  test('renderiza el componente', async () => {
    render(<Reportes />);
    expect(screen.getByText('Reportes')).toBeInTheDocument();
  });

    //prueba de renderizacion, evento
  test('cambia la sección al hacer clic en el botón', async () => {
    render(<Reportes />);
    fireEvent.click(screen.getByText('Buses'));
    expect(screen.getByText('Reporte de Buses')).toBeInTheDocument();

  });
   // prueba de renerizacion y evento
  test('dispara clic en el botón de búsqueda', async () => {
    render(<Reportes />);
    fireEvent.click(screen.getByText('Buscar'));
  });

});
