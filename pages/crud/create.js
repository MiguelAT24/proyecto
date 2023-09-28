// pages/crud/create.js
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const CrearPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    marca: '',
    modelo: '',
    placa: '',
    asiento: '',
    capacidad: '',
    tipo_bus: 'semicama', // Valor predeterminado
    notas: '',
  });

  const { nombre, identificacion, marca, modelo, placa, asiento, capacidad, tipo_bus, notas } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Autobús creado con éxito, puedes redirigir al usuario a la página de detalles del autobús
        // Por ejemplo, history.push('/bus-details/' + newBusId);
        router.push('/Dashboard');
      } else {
        // Manejar errores de creación de autobús
        console.error('Error al crear el autobús.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Crear Autobús</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
        <div className="form-group col-md-8">
            <label htmlFor="nombre">Nombre del Autobús:</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="identificacion">Identificación:</label>
            <input
              type="text"
              className="form-control"
              id="identificacion"
              name="identificacion"
              value={identificacion}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="marca">Marca:</label>
            <input
              type="text"
              className="form-control"
              id="marca"
              name="marca"
              value={marca}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="modelo">Modelo:</label>
            <input
              type="text"
              className="form-control"
              id="modelo"
              name="modelo"
              value={modelo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="placa">Número de Placa:</label>
            <input
              type="text"
              className="form-control"
              id="placa"
              name="placa"
              value={placa}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="asiento">Número de asientos:</label>
            <input
              type="text"
              className="form-control"
              id="asiento"
              name="asiento"
              value={asiento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="capacidad">Capacidad de pasajeros:</label>
            <input
              type="text"
              className="form-control"
              id="capacidad"
              name="capacidad"
              value={capacidad}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="tipo_bus">Selecciona el Tipo de Autobús:</label>
            <select
              className="form-control"
              id="tipo_bus"
              name="tipo_bus"
              value={tipo_bus}
              onChange={handleChange}
              required
            >
              <option value="semicama">BUS SEMICAMA</option>
              <option value="leito">BUS LEITO</option>
              <option value="suite">BUS SUITE CAMA</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notas">Notas Adicionales:</label>
          <textarea
            className="form-control"
            id="notas"
            name="notas"
            rows="3"
            value={notas}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" name="registro">
          REGISTRAR
        </button>
      </form>
    </div>
  );
};

export default CrearPage;