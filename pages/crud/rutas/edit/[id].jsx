import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return response.json();
};

export default function EditBus() {
  const router = useRouter();
  const { id } = router.query;
  const { data: formDataFromSWR, error: errorFromSWR } = useSWR(`/api/rutas/${id}`, fetcher);

  const [formData, setFormData] = useState({
    nombre: '',
    origen: '',
    destino: '',
    duracion: '',
   
  });

  useEffect(() => {
    // Obtener los detalles del autobús actual utilizando la ruta /api/buses/[id]
    if (id && formDataFromSWR) {
      setFormData(formDataFromSWR);
    }
  }, [id, formDataFromSWR]);

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
      const response = await fetch(`/api/rutas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Redirige al usuario a la página de detalles del autobús actualizado
        router.push('/crud/rutas/read');
      } else {
        // Handle non-200 response status codes
        console.error('Error al actualizar la ruta:', response.statusText);
      }
    } catch (error) {
      // Handle network errors
      console.error('Error de red:', error.message);
    }
  };
  
  return (
    <div className="container">
      <h1 className="my-4">Editar Autobús</h1>
      {errorFromSWR && <p>Error al obtener los datos del servidor.</p>}
      {!errorFromSWR && formDataFromSWR && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre del Autobús:
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
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

          <div className="mb-3">
            <label htmlFor="destino" className="form-label">
              Destino: 
            </label>
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

          <div className="mb-3">
            <label htmlFor="duracion" className="form-label">
              Duracion:
            </label>
            <input
              type="text"
              className="form-control"
              id="duracion"
              name="duracion"
              value={formData.duracion}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </form>
      )}
    </div>
  );
}
