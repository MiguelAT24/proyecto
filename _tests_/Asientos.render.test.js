import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Leito from '../components/MapAsientos';

describe('Leito Component', () => {
  test('representa los asientos correctamente', () => {
    const onAsientoSeleccionadoMock = jest.fn();
    const seatsPerRow = 3;
    const totalSeats = 15;
    const specialSeats = [6, 30];

    render(
      <Leito
        onAsientoSeleccionado={onAsientoSeleccionadoMock}
        seatsPerRow={seatsPerRow}
        totalSeats={totalSeats}
        specialSeats={specialSeats}
      />
    );
  });
});
