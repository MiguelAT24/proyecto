import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Leito from '../../../components/tipo.jsx';
import { useRouter } from 'next/router';

const generarSerieUnica = () => {
    return `S-${Math.floor(Math.random() * 10000)}`;
  };


const VentaPasajes = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
  });
  const [mostrarFormularioVenta, setMostrarFormularioVenta] = useState(false);


  const [showMapaLeito, setShowMapaLeito] = useState(false);
  const [nombre, setNombre] = useState('');
  const [cedulaIdentidad, setCedulaIdentidad] = useState('');
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [fecha, setFecha] = useState('');
  const [serie, setSerie] = useState(generarSerieUnica());

  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

  
const [estadoAsiento, setEstadoAsiento] = useState('');
const [precio, setPrecio] = useState('');
const [vendidoPor, setVendidoPor] = useState(usuarioAutenticado || '');

  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [asientoSeleccionado, setAsientoSeleccionado] = useState(null);
 
  // Define una lista de viajes disponibles
  const [viajesDisponibles, setViajesDisponibles] = useState([]);

  const handleSeleccionarViaje = (event) => {
    const selectedId = parseInt(event.target.value);
    const selectedViaje = viajesDisponibles.find((viaje) => viaje.id === selectedId);
    setViajeSeleccionado(selectedViaje);
    

    if (selectedViaje) {
      setOrigen(selectedViaje.origen);
      setDestino(selectedViaje.destino);
      setFecha(selectedViaje.fecha);
    }

    if (selectedViaje && selectedViaje.servicio === 'Leito') {
      setShowMapaLeito(true);
    } else {
      setShowMapaLeito(false);
    }
  };
  

  const handleAsientoSeleccionado = (asiento) => {

    if (asiento.estado === 'vendido') {
      // Muestra un mensaje de error o notificación al usuario
      alert('Este asiento ya ha sido vendido.');
    } else {
      setAsientoSeleccionado(asiento);
      setSerie(generarSerieUnica());
      // Aquí debes asegurarte de establecer mostrarFormularioVenta en true
      setMostrarFormularioVenta(true);  // Mostrar el formulario al seleccionar un asiento
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (asientoSeleccionado.estado === 'vendido') {
        // Muestra un mensaje de error o notificación al usuario
        alert('Este asiento ya ha sido vendido.');
      } else {
        const response = await axios.post('/api/ventas', {
        nombre,
        cedulaIdentidad,
        origen,
        destino,
        fecha,
        asientoSeleccionado,
        serie,
        precio,
        vendidoPor,
      });
      if (response.status === 201) {
        // Venta de asiento registrada con éxito, puedes redirigir al usuario a la página de detalles de la venta
        // Por ejemplo, router.push('/venta-detalles/' + nuevaVentaId);
        router.push('/Dashboard');
      } else {
        // Manejar errores de registro de venta de asiento
        console.error('Error al registrar la venta de asiento.');
      }
    }
  } catch (error) {
    console.error('Error de red:', error);
  }
};


  useEffect(() => {
    setSerie(generarSerieUnica());
  }, []);

  useEffect(() => {
    // Realiza una solicitud al servidor para obtener la lista de viajes
    axios.get('/api/viajes') // Ajusta la URL según tu estructura de rutas en el servidor
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          // Almacena los datos de los viajes en el estado
          setViajesDisponibles(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Realiza una solicitud al servidor para obtener la información del usuario autenticado
    axios.get('/api/profile') // Ajusta la URL según tu estructura de rutas en el servidor
      .then((response) => {
        // Comprueba si la respuesta contiene la información del usuario autenticado
        if (response.data && response.data.username) {
          setUsuarioAutenticado(response.data.username);
          setVendidoPor(response.data.username);
        } else {
          // El usuario no está autenticado
          setUsuarioAutenticado(null);
          setVendidoPor('');
        }
      })
      .catch((error) => {
        console.error(error);
        // Maneja errores de solicitud
        setUsuarioAutenticado(null);
        setVendidoPor('');
      });
  }, []);

  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Venta de Pasajes</h2>
      <div className="row">
        {/* Contenedor de la izquierda para seleccionar un viaje */}
        <div className="col-md-4">
          <div className="mb-3">
            <label htmlFor="viaje" className="form-label">Seleccionar Viaje:</label>
            <select
              className="form-control"
              id="viaje"
              value={viajeSeleccionado ? viajeSeleccionado.id : ''}
              onChange={handleSeleccionarViaje}
            >
              <option value="">-- Seleccione un viaje --</option>
              {viajesDisponibles.map((viaje) => (
                <option key={viaje.id} value={viaje.id}>
                  {`${viaje.ruta} `}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Contenedor de la derecha para mostrar información y mapa de asientos */}
        <div className="col-md-4">
          {viajeSeleccionado && (
            <div>
              <h3>Información del Viaje:</h3>
              <p>Origen: {viajeSeleccionado.origen}</p>
              <p>Destino: {viajeSeleccionado.destino}</p>
              <p>Fecha: {viajeSeleccionado.fecha}</p>
            </div>
          )}
        </div>
        <div className="col-md-4">
          {showMapaLeito && (
            <div>
              <h3>Mapa de Asientos - Leito:</h3>
              <Leito  seatsPerRow={3}
                totalSeats={29}
                specialSeats={[6, 30]}
                onAsientoSeleccionado={(seatNumber) => handleAsientoSeleccionado(seatNumber)}/>
              <button
                className="btn btn-primary mt-2"
                onClick={() => setMostrarFormularioVenta(true)}
              >
                Comprar Asiento
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Contenedor de abajo para el formulario de venta */}
      {asientoSeleccionado && mostrarFormularioVenta && (

<div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title">Venta de Asiento</h5>
      <button type="button" className="close" onClick={() => setMostrarFormularioVenta(false)}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">

        <form onSubmit={handleSubmit}>
          
          <div className="row mt-4">
            
            <div className="col-md-12">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="cedulaIdentidad" className="form-label">Cédula de Identidad:</label>
                <input
                  type="text"
                  className="form-control"
                  id="cedulaIdentidad"
                  placeholder="Número de Cédula"
                  value={cedulaIdentidad}
                  onChange={(e) => setCedulaIdentidad(e.target.value)}
                />
              </div>
            </div>
              <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="origen" className="form-label">Origen:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="origen"
                          value= {viajeSeleccionado.origen}
                          readOnly
                        />
                      </div>
                    </div>
              <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="destino" className="form-label">Destino:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="destino"
                          value={viajeSeleccionado.destino}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="fecha" className="form-label">Fecha:</label>
                        <input
                          type="text"
                          className="form-control"
                          id="fecha"
                          value={viajeSeleccionado.fecha}
                          readOnly
                        />
                      </div>
                    </div>
          </div>

          <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="serie" className="form-label">Serie:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="serie"
                    placeholder="Serie del asiento"
                    value={serie}
                    onChange={(e) => setSerie(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="estadoAsiento" className="form-label">Estado del Asiento:</label>
                  <select
                    className="form-control"
                    id="estadoAsiento"
                    value={estadoAsiento}
                    onChange={(e) => setEstadoAsiento(e.target.value)}
                  >
                    <option value="Ocupado">Ocupado</option>
                    <option value="Reservado">Reservado</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="asiento" className="form-label">Asiento Seleccionado:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="asiento"
                    value={asientoSeleccionado || ''}
                    readOnly // Para hacerlo solo de lectura
                  />
                </div>
            </div>
            </div>
            
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="precio" className="form-label">Precio:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="precio"
                    placeholder="Precio del asiento"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="vendidoPor" className="form-label">Vendido Por:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="vendidoPor"
                    value={usuarioAutenticado || ''}
                    readOnly // Para hacerlo solo de lectura
                  />
                </div>
              </div>
        
          {/* Resto del formulario */}
          <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormularioVenta(false)}>Cerrar</button>
                <button type="submit" className="btn btn-primary" name="registro">REGISTRAR</button>
              </div>
              </form>
              </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentaPasajes;