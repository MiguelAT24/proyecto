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

export default function EditViaje() {
  const router = useRouter();
  const { id } = router.query;
  const { data: formDataFromSWR, error: errorFromSWR } = useSWR(`/api/viajes/${id}`, fetcher);

  const [rutas, setRutas] = useState([]);
  const [autobuses, setAutobuses] = useState([]);

  const [formData, setFormData] = useState({
    fecha: '',
    horaSalida: '',  // Cambiado de 'salida' a 'horaSalida'
    horaLlegada: '', // Cambiado de 'llegada' a 'horaLlegada'
    ruta: '',
    origen: '',
    destino: '',
    bus: '',
    servicio: '',
    precio: '',
  });

  useEffect(() => {
    console.log("Datos de la API:", formDataFromSWR);
    // Obtener los detalles de la programación de viaje actual utilizando la ruta /api/viajes/[id]
    if (id && formDataFromSWR) {
      // Convierte la fecha al formato "yyyy-MM-dd"
      const fechaFormateada = new Date(formDataFromSWR.fecha).toISOString().split('T')[0];
      setFormData({
        fecha: fechaFormateada,
        horaSalida: formDataFromSWR.ho_sa, // Cambia el nombre de campo aquí
        horaLlegada: formDataFromSWR.ho_lle, // Cambia el nombre de campo aquí
        ruta: formDataFromSWR.ruta,
        origen: formDataFromSWR.origen,
        destino: formDataFromSWR.destino,
        bus: formDataFromSWR.bus,
        servicio: formDataFromSWR.servicio,
        precio: formDataFromSWR.precio,
      });
      console.log('formData:', formData); // Agregar esta línea para depuración
    }
  }, [id, formDataFromSWR]);

  useEffect(() => {
    // Obtener las rutas de la API (ajusta la URL según sea necesario)
    const fetchRutas = async () => {
      try {
        const response = await fetch('/api/rutas');
        if (response.status === 200) {
          const data = await response.json();
          setRutas(data);
        } else {
          console.error('Error al cargar las rutas.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    // Obtener los autobuses de la API (ajusta la URL según sea necesario)
    const fetchAutobuses = async () => {
      try {
        const response = await fetch('/api/traer_bus');
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
      const response = await fetch(`/api/viajes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
     
      if (!response.ok) {
        throw new Error('Error al actualizar la programación de viaje.');
      }
  
      // Si llegamos aquí, la solicitud se realizó con éxito
      // Redirige al usuario a la página de detalles de la programación de viaje actualizada
      router.push('/crud/viaje/read');
    } catch (error) {
      console.error('Error al actualizar la programación de viaje:', error);
    }
  };

   return (
    <div className="container">
      <h1 className="my-4">Editar Programación de Viajes</h1>
      {errorFromSWR && <p>Error al obtener los datos del servidor.</p>}
      {!errorFromSWR && formDataFromSWR && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="fecha" className="form-label">
              Fecha:
            </label>
            <input
              type="date"
              className="form-control"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="horaSalida" className="form-label">
              Hora de Salida:
            </label>
            <input
              type="time"
              className="form-control"
              id="horaSalida"
              name="horaSalida"
              value={formData.horaSalida}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="horaLlegada" className="form-label">
              Hora de Llegada:
            </label>
            <input
              type="time"
              className="form-control"
              id="horaLlegada"
              name="horaLlegada"
              value={formData.horaLlegada}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ruta" className="form-label">
              Seleccionar Ruta:
            </label>
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

          <div className="mb-3">
            <label htmlFor="bus" className="form-label">
              Seleccionar Autobús:
            </label>
            <select
              className="form-control"
              id="bus"
              name="bus"
              value={formData.bus}
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

          <div className="mb-3">
            <label htmlFor="servicio" className="form-label">
              Seleccionar Servicio:
            </label>
            <select
              className="form-control"
              id="servicio"
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar un autobús</option>
              <option value="Semi cama">Semi Cama</option>
              <option value="Leito">Leito</option>
              <option value="Suite">Suite Cama</option>
              {/* Agrega más opciones de servicios según sea necesario */}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="precio" className="form-label">
              Precio:
            </label>
            <input
              type="text"
              className="form-control"
              id="precio"
              name="precio"
              value={formData.precio}
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


