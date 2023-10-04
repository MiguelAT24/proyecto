import React from 'react';

const Asiento = ({ numero, onClick }) => {
  return (
    <div
      className="asiento"
      onClick={() => onClick(numero)}
    >
      {numero}
    </div>
  );
};

export default Asiento;
