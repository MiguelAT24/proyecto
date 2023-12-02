import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@testing-library/jest-dom';
import Home from '../pages/Clima';

const queryClient = new QueryClient();

describe('Clima Component', () => {
test('debería actualizar la ciudad seleccionada cuando cambie el valor del menú desplegable', () => {
  render(
  <QueryClientProvider client={queryClient}>
  <Home />
</QueryClientProvider>
);

  // Initial render
  const initialCityLabel = screen.getByText(/Selecciona una ciudad/i);
  expect(initialCityLabel).toBeInTheDocument();

  // Check if the default city is selected
  const defaultCityOption = screen.getByDisplayValue('Yacuiba');
  expect(defaultCityOption).toBeInTheDocument();

  // Change the city value
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Camiri' } });

  // Verify if the selected city has been updated
  const updatedCityOption = screen.getByDisplayValue('Camiri');
  expect(updatedCityOption).toBeInTheDocument();
});
});
