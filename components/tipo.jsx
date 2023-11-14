import React, { useState } from 'react';

const Leito = ({ onAsientoSeleccionado, seatsPerRow, totalSeats, specialSeats }) => {

    // No declares nuevamente las constantes totalSeats y seatsPerRow aquí
  
    const rows = Math.ceil(totalSeats / seatsPerRow);
  
    const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seatNumber) => {
    setSelectedSeat({ numero: seatNumber, estado: 'libre' });
    onAsientoSeleccionado({ numero: seatNumber, estado: 'libre' });
  };

  const renderSeats = () => {
    const seats = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < seatsPerRow; j++) {
        let seatNumber = i * seatsPerRow + j + 1;

        if (seatNumber === 6) {
          row.push(
            <div
              key={seatNumber}
              className={`seat ${selectedSeat === seatNumber ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seatNumber)}
            >
              <i className="material-icons">GRADA</i>
            </div>
          );
          seatNumber = null;
        } else if (seatNumber === 30) {
          row.push(
            <div
              key={seatNumber}
              className={`seat ${selectedSeat === seatNumber ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seatNumber)}
            >
              <i className="material-icons">BAÑO</i>
            </div>
          );
          seatNumber = null;
        } else if (seatNumber > 6 && seatNumber !== 4 && seatNumber !== 5) {
          seatNumber--;
        }

        if (seatNumber && seatNumber <= totalSeats) {
          const seatClassName = j === 2 ? 'seat separate' : 'seat';
          row.push(
            <div
              key={seatNumber}
              className={`seat ${seatClassName} ${selectedSeat === seatNumber ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seatNumber)}
            >
              {seatNumber}
            </div>
          );
        }
      }
      seats.push(
        <div key={i} className="seat-row">
          {row}
        </div>
      );
    }

    return seats;
  };

  return (
    
    <div className="bus">
      <div className="bus-seating">
      <div className="seating-table">{renderSeats()}</div>
      </div>
      {selectedSeat && (
        <div className="selected-seat">
          <p>Asiento seleccionado:  {selectedSeat.numero}</p>
        </div>
      )}
    </div>
  );
};

export default Leito;
