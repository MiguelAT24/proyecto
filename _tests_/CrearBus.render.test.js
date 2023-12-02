import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CrearPage from '../pages/crud/bus/create';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    ...jest.requireActual('next/router'),
    useRouter: jest.fn(),
  }));
  
  describe('CrearBus component', () => {
    test('se renderiza correctamente', () => {
      // Simula la ruta y otras propiedades del enrutador que tu componente puede estar utilizando
      useRouter.mockImplementation(() => ({
        route: '/crud/bus/create', // Coloca la ruta de tu página
        pathname: '/crud/bus/create',
        query: {},
        asPath: '/crud/bus/create',
      }));
  
      render(<CrearPage />);

  // Verifica que el encabezado esté presente
  const heading = screen.getByRole('heading', { name: 'Registrar Bus' });
  expect(heading).toBeInTheDocument();

  // Verifica que los campos del formulario estén presentes
  const nombreInput = screen.getByLabelText('Nombre del Autobús:');
  expect(nombreInput).toBeInTheDocument();

  const identificacionInput = screen.getByLabelText('Identificación:');
  expect(identificacionInput).toBeInTheDocument();

  const marcaInput = screen.getByLabelText('Marca:');
  expect(marcaInput).toBeInTheDocument();

  const modeloInput = screen.getByLabelText('Modelo:');
  expect(modeloInput).toBeInTheDocument();

  const placaInput = screen.getByLabelText('Número de Placa:');
  expect(placaInput).toBeInTheDocument();

  const asientoInput = screen.getByLabelText('Número de asientos:');
  expect(asientoInput).toBeInTheDocument();

  const capacidadInput = screen.getByLabelText('Capacidad de pasajeros:');
  expect(capacidadInput).toBeInTheDocument();

  const tipoBusSelect = screen.getByLabelText('Selecciona el Tipo de Autobús:');
  expect(tipoBusSelect).toBeInTheDocument();

  const notasTextarea = screen.getByLabelText('Notas Adicionales:');
  expect(notasTextarea).toBeInTheDocument();

  // Verifica que el botón de registro esté presente
  const submitButton = screen.getByRole('button', { name: 'REGISTRAR' });
  expect(submitButton).toBeInTheDocument();
});
});