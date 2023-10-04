import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const Estadisticas = () => {
    const [chartInstance, setChartInstance] = useState(null);
    const chartContainerRef = useRef(null);

  // Datos de ejemplo para las estadísticas
  const [estadisticas] = useState([
    { nombre: 'Ventas', valor: 150 },
    { nombre: 'Clientes', valor: 120 },
    { nombre: 'Buses', valor: 450 },
    { nombre: 'Rutas', valor: 30 },
  ]);

  // Preparar los datos para el gráfico
  const labels = estadisticas.map((est) => est.nombre);
  const valores = estadisticas.map((est) => est.valor);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Valores',
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.8)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: valores,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: 'category', // Tipo de escala 'category'
        labels: labels,   // Etiquetas del eje X
      },
      y: {
        beginAtZero: true, // Comenzar desde cero en el eje Y
      },
    },
  };

  useEffect(() => {
    console.log(chartContainerRef.current); 
    if (chartContainerRef.current) {
      const newChartInstance = new Chart(chartContainerRef.current, {
        type: 'bar',
        data: data,
        options: options,
      });
      setChartInstance(newChartInstance);
  
      // Función de limpieza para destruir el gráfico cuando el componente se desmonta
      return () => {
        if (newChartInstance) {
          newChartInstance.destroy();
        }
      };
    }
  }, []);
  

  return (

    <div className="container p-5">
      <h1>Estadísticas</h1>
      <div className="row">
        <div className="col-md-8">
          {/* Ref para el contenedor del gráfico */}
          <div ref={chartContainerRef}>
            {/* El gráfico se renderizará aquí */}
            <Bar data={data} options={options} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Datos en formato tabular:</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {estadisticas.map((estadistica, index) => (
                    <tr key={index}>
                      <td>{estadistica.nombre}</td>
                      <td>{estadistica.valor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
