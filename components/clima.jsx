// components/Weather.js
import { useQuery } from 'react-query';
import axios from 'axios';

const VerClima = ({ city }) => {
  const apiKey = '7519eed6f424d93cd0d2f5b62c4f7b51'; // Reemplaza con tu propia clave de API
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const { data, isLoading, isError } = useQuery('weatherData', async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al obtener datos meteorológicos.</p>;

  // Convierte la temperatura de kelvin a celsius
  const temperatureInCelsius = (data.main.temp - 273.15).toFixed(2);
  const windSpeedInKmph = (data.wind.speed * 3.6).toFixed(2);

  return (
    <div>
      <h2>Condiciones actuales en {city}:</h2>
      <p>Temperatura: {temperatureInCelsius}°C</p>
      <p>Condición: {data.weather[0].description}</p>
      <p>Velocidad del viento: {windSpeedInKmph} km/h</p>
    </div>
  );
};

export default VerClima;
