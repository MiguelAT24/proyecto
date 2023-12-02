
import { useState } from 'react';
import VerClima from '../components/clima';

const Home = () => {
  const [selectedCity, setSelectedCity] = useState('Yacuiba');

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1>Consulta del Tiempo</h1>
      <label htmlFor="citySelect">Selecciona una ciudad: </label>
      <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
        <option value="Yacuiba">Yacuiba</option>
        <option value="Villa Montes">Villa Montes</option>
        <option value="Camiri">Camiri</option>
        <option value="Santa Cruz de la Sierra">Santa Cruz</option>
        <option value="Tarija">Tarija</option>
      </select>
      <VerClima city={selectedCity} />
    </div>
  );
};

export default Home;
