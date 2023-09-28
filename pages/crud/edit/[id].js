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
  const { data: formDataFromSWR, error: errorFromSWR } = useSWR(`/api/products/${id}`, fetcher);

  const [formData, setFormData] = useState({
    nombre: '',
    id: '',
    marca: '',
    modelo: '',
    placa: '',
    asientos: '',
    capacidad: '',
    tipo_bus: '', // Elimina el valor predeterminado
    adicional: '',
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
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
     
      if (response.status === 200) {
        // Redirige al usuario a la página de detalles del autobús actualizado
        router.push('/crud/read');
      } else {
        console.error('Error al actualizar el autobús.');
      }
    } catch (error) {
      console.error('Error de red:', error);
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
            <label htmlFor="id" className="form-label">
              Identificación:
            </label>
            <input
              type="text"
              className="form-control"
              id="id"
              name="id" 
              value={formData.id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="marca" className="form-label">
              Marca:
            </label>
            <input
              type="text"
              className="form-control"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="modelo" className="form-label">
              Modelo:
            </label>
            <input
              type="text"
              className="form-control"
              id="modelo"
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="placa" className="form-label">
              Número de Placa:
            </label>
            <input
              type="text"
              className="form-control"
              id="placa"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="asientos" className="form-label">
              Número de asientos:
            </label>
            <input
              type="text"
              className="form-control"
              id="asientos"
              name="asientos"
              value={formData.asientos}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="capacidad" className="form-label">
              Capacidad de pasajeros:
            </label>
            <input
              type="text"
              className="form-control"
              id="capacidad"
              name="capacidad"
              value={formData.capacidad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tipo_bus" className="form-label">
              Selecciona el Tipo de Autobús:
            </label>
            <select
              className="form-control"
              id="tipo_bus"
              name="tipo_bus"
              value={formData.tipo_bus}
              onChange={handleChange}
              required
            >
              <option value="semicama">BUS SEMICAMA</option>
              <option value="leito">BUS LEITO</option>
              <option value="suite">BUS SUITE CAMA</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="adicional" className="form-label">
              Notas Adicionales:
            </label>
            <textarea
              className="form-control"
              id="adicional"
              name="adicional"
              rows="3"
              value={formData.adicional}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Guardar Cambios
          </button>
        </form>
      )}
    </div>
  );
}
