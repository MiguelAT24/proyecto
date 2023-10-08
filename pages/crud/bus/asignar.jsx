import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AsignarBus = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    chofer: '',
    relevo: '',
    bus: '',
  });

  const [asignaciones, setAsignaciones] = useState([]);
  const [choferes, setChoferes] = useState([]); // Nuevo estado para almacenar choferes
  const [buses, setBuses] = useState([]);

  const { chofer, relevo, bus } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAgregarAsignacion = async () => {
    if (chofer && relevo && bus) {
      try {
        const response = await fetch('/api/asignar_bus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 201) {
          const nuevaAsignacion = {
            chofer,
            relevo,
            bus,
          };
          setAsignaciones([...asignaciones, nuevaAsignacion]);
          setFormData({
            chofer: '',
            choferRelevo: '',
            bus: '',
          });

          router.push('/Dashboard');
        } else {
          console.error('Error al crear la asignación.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };

  useEffect(() => {
    // Cargar la lista de choferes desde la API
    const fetchChoferes = async () => {
      try {
        const response = await fetch('/api/asignar_bus'); // Reemplaza '/api/choferes' con la URL correcta de tu API de choferes
        if (response.status === 200) {
          const data = await response.json();
          setChoferes(data);
        } else {
          console.error('Error al cargar los choferes.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    const fetchBuses = async () => {
      try {
        const response = await fetch('/api/bus'); // Reemplaza '/api/buses' con la URL correcta de tu API de buses
        if (response.status === 200) {
          const data = await response.json();
          setBuses(data);
        } else {
          console.error('Error al cargar los buses.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchBuses();
    fetchChoferes();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <div className="container mt-5">
      <h1>Asignar Bus</h1>
      <div className="form-group">
        <label>Chofer:</label>
        <select
          className="form-control"
          name="chofer"
          value={chofer}
          onChange={handleInputChange}
        >
          <option value="">Selecciona un chofer</option>
          {choferes.map((choferOption) => (
            <option key={choferOption.id} value={choferOption.nombre}>
              {choferOption.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Chofer de Relevo:</label>
        <select
          className="form-control"
          name="relevo"
          value={relevo}
          onChange={handleInputChange}
        >
          <option value="">Selecciona un chofer de relevo</option>
          {choferes.map((choferOption) => (
            <option key={choferOption.id} value={choferOption.nombre}>
              {choferOption.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Bus:</label>
        <select
          className="form-control"
          name="bus"
          value={bus}
          onChange={handleInputChange}
        >
          <option value="">Selecciona un bus</option>
          {buses.map((busOption) => (
            <option key={busOption.id} value={busOption.nombre}>
              {busOption.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="text-center p-5">
        <button
          className="btn btn-primary"
          onClick={handleAgregarAsignacion}
        >
          Agregar Asignación
        </button>
      </div>
      <h2>Asignaciones:</h2>
      {/* Aquí muestra la lista de asignaciones similar a tu código original */}
    </div>
  );
};

export default AsignarBus;