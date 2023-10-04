import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const CrearProgramacionViajes = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fecha: '',
    horaSalida: '',
    horaLlegada: '',
    ruta: '',
    bus: '',
    servicio: '',
    precio: '',
    origen: '', // Campo de origen
    destino: '', // Campo de destino
  });

  const [rutas, setRutas] = useState([]); // Estado para almacenar las rutas
  const [autobuses, setAutobuses] = useState([]); // Estado para almacenar los autobuses

  const { fecha, horaSalida, horaLlegada, ruta, bus, servicio, precio, origen, destino } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ruta') {
      const selectedRoute = rutas.find((route) => route.nombre === value);
      if (selectedRoute) {
        setFormData({
          ...formData,
          ruta: selectedRoute.nombre,
          origen: selectedRoute.origen,
          destino: selectedRoute.destino,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/viajes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha,
          horaSalida,
          horaLlegada,
          ruta: formData.ruta, // Utiliza formData.ruta en lugar de ruta
          bus,
          servicio,
          precio,
          origen,
          destino,
        }),
      });

      if (response.status === 201) {
        // Viaje creado con éxito, puedes redirigir al usuario a la página de detalles del viaje
        // Por ejemplo, history.push('/viaje-details/' + newViajeId);
        router.push('/Dashboard');
      } else {
        // Manejar errores de creación de viaje
        console.error('Error al crear el viaje.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    // Cargar la lista de rutas desde la API
    const fetchRutas = async () => {
      try {
        const response = await fetch('/api/rutas'); // Reemplaza '/api/rutas' con la URL correcta de tu API de rutas
        if (response.status === 200) {
          const data = await response.json();
          setRutas(data);



          if (data.length > 0) {
            const firstRoute = data[0];
            setFormData({
              ...formData,
              origen: firstRoute.origen,
              destino: firstRoute.destino,
            });
          }

        } else {
          console.error('Error al cargar las rutas.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    // Cargar la lista de autobuses desde la API
    const fetchAutobuses = async () => {
      try {
        const response = await fetch('/api/traer_bus'); // Reemplaza '/api/autobuses' con la URL correcta de tu API de autobuses
        if (response.status === 200) {
          const data = await response.json();
          setAutobuses(data);
        } else {
          console.error('Error al cargar los autobuses.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchRutas();
    fetchAutobuses();
  }, []);

  
  return (
    <div className="container mt-5">
      <h1>Crear Programación de Viajes</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="fecha">Fecha:</label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="horaSalida">Hora de Salida:</label>
          <input
            type="time"
            className="form-control"
            id="horaSalida"
            name="horaSalida"
            value={horaSalida}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="horaLlegada">Hora de Llegada:</label>
          <input
            type="time"
            className="form-control"
            id="horaLlegada"
            name="horaLlegada"
            value={horaLlegada}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-flex">
        <div className="form-group py-3 flex-fill">
    <label htmlFor="ruta">Seleccionar Ruta:</label>
    <select
    className="form-control"
    id="ruta"
    name="ruta"
    value={formData.ruta}
    onChange={handleChange}
    required
  >
    <option value="">Seleccionar una ruta</option>
    {rutas.map((rutaOption) => (
      <option key={rutaOption.id} value={rutaOption.nombre}>
        {rutaOption.nombre}
      </option>
    ))}
  </select>
  </div>
  <div className="form-group py-3 flex-fill">
    <label htmlFor="origen">Origen:</label>
    <input
      type="text"
      className="form-control"
      id="origen"
      name="origen"
      value={formData.origen}
      onChange={handleChange}
      required
    />
  </div>
  <div className="form-group py-3 flex-fill">
    <label htmlFor="destino">Destino:</label>
    <input
      type="text"
      className="form-control"
      id="destino"
      name="destino"
      value={formData.destino}
      onChange={handleChange}
      required
    />
  </div>
</div>

        <div className="form-group py-3">
          <label htmlFor="bus">Seleccionar Autobús:</label>
          <select
            className="form-control"
            id="bus"
            name="bus"
            value={bus}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar un autobús</option>
            {autobuses.map((autobusOption) => (
              <option key={autobusOption.id} value={autobusOption.bus}>
                {autobusOption.bus}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="servicio">Seleccionar Servicio:</label>
          <select
            className="form-control"
            id="servicio"
            name="servicio"
            value={servicio}
            onChange={handleChange}
            required
          >
            <option value="Semi cama">Semi Cama</option>
            <option value="Leito">Leito</option>
            <option value="Suite">Suite Cama</option>
            {/* Agrega más opciones de choferes según sea necesario */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="text"
            className="form-control"
            id="precio"
            name="precio"
            value={precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="container text-center p-5">
        <button type="submit" className="btn btn-primary">
          Crear Viaje
        </button>
        </div>
      </form>
    </div>
  );
};

export default CrearProgramacionViajes;
