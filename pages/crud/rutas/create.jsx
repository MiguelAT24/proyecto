import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CrearNuevaRuta= () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
      nombre: '',
      origen: '',
      destino: '',
      duracion: '',
    });
  

  const { nombre,origen, destino, duracion} = formData;

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
      const response = await fetch('/api/rutas', {
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
    <div className="container mt-5">
      <h2>Crear Nueva Ruta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la Ruta:</label>
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
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="origen">Origen:</label>
            <input
              type="text"
              className="form-control"
              id="origen"
              name="origen"
              value={origen}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="destino">Destino:</label>
            <input
              type="text"
              className="form-control"
              id="destino"
              name="destino"
              value={destino}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="duracion">Duración Estimada (en horas):</label>
            <input
              type="number"
              className="form-control"
              id="duracion"
              name="duracion"
              value={duracion}
              onChange={handleChange}
              required
            />
          </div>
        </div>
  
        <div className="container text-center p-5">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        <button type="button" className="btn btn-secondary">
          Cancelar
        </button>
        </div>
      </form>
    </div>
  );
}

export default CrearNuevaRuta;
