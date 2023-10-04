import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CrearRolUsuario = () => {
  const router = useRouter();
  const [rolData, setRolData] = useState({
    nombre: '',
    descripcion: '',
  });

  const { nombre, descripcion } = rolData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRolData({
      ...rolData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/rol', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rolData),
      });

      if (response.status === 201) {
        // Rol de usuario creado con éxito, puedes redirigir al usuario a la lista de roles u otra página.
        router.push('/Dashboard');
      } else {
        // Manejar errores de creación de rol de usuario
        console.error('Error al crear el rol de usuario.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Crear Rol de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="nombre">Nombre del Rol:</label>
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
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Rol de Usuario
        </button>
      </form>
    </div>
  );
};

export default CrearRolUsuario;
