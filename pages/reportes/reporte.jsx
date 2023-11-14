import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reportes = () => {
  const [seccionSeleccionada, setSeccionSeleccionada] = useState('ventas');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [busqueda, setBusqueda] = useState('');
  const [busquedaBuses, setBusquedaBuses] = useState('');
  const [busquedaRutas, setBusquedaRutas] = useState('');

  const [resultados, setResultados] = useState([]);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);

  const reactToPdfRef = useRef();

  

  useEffect(() => {

    fetchDataFromApi(seccionSeleccionada, fechaSeleccionada, busqueda);
  }, [seccionSeleccionada, fechaSeleccionada, busqueda]);

  const fetchDataFromApi = async (seccion, fecha, busqueda) => {
    try {
      let apiUrl = '';
      switch (seccion) {
        case 'ventas':
          apiUrl = '/api/vent';
          break;
        case 'rutas':
          apiUrl = '/api/rutas';
          break;
        case 'buses':
          apiUrl = '/api/products';
          break;
        default:
          break;
      }

      const response = await fetch(apiUrl);
      console.log('Response from API:', response);

      if (!response.ok) {
        throw new Error(`Error al obtener los datos de ${seccion}.`);
      }
      const data = await response.json();

      
      // No es necesario filtrar los datos de ventas por fecha o búsqueda aquí
      // simplemente asigna los datos a setResultados
      setResultados(data);
    } catch (error) {
      console.error(`Error al obtener datos de la API de ${seccion}:`, error);
    }
  };

  const handleSeccionChange = (seccion) => {
    setSeccionSeleccionada(seccion);
  };

  const handleFechaChange = (date) => {
    setFechaSeleccionada(date);
  };

  const handleBusquedaChange = (e) => {
    if (seccionSeleccionada === 'buses') {
      setBusquedaBuses(e.target.value);
    } else if (seccionSeleccionada === 'rutas') {
      setBusquedaRutas(e.target.value);
    } else { (seccionSeleccionada === 'ventas')
      setBusqueda(e.target.value);
    }
  };

  const mostrarTabla = () => {
    fetchDataFromApi(seccionSeleccionada, fechaSeleccionada, busqueda);
  };

  const handleGeneratePdf = async () => {
    setGeneratingPdf(true);

    try {
      const content = reactToPdfRef.current;
      const fechaISO = fechaSeleccionada.toISOString().split('T')[0];
      const pdfOptions = {
        margin: 10,
        filename: 'reporte.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      // Verificar si estamos en un entorno de navegador antes de importar html2pdf.js
      if (typeof window !== 'undefined') {
        const html2pdf = (await import('html2pdf.js')).default;
        const pdf = await html2pdf().from(content).set(pdfOptions).outputPdf();

        // Construir la URL del PDF basada en la sección seleccionada
        const pdfUrl = `${process.env.PUBLIC_URL}/${seccionSeleccionada}/pdfs/reporte_${fechaISO}.pdf`;

        // Abre el PDF en una nueva ventana
        window.open(pdfUrl, '_blank');

        setPdfGenerated(true);
      }
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
    <div className="container" ref={reactToPdfRef}>
      <h1 className="mt-5">Reportes</h1>
      <div className="mt-4">
        <h3>Seleccionar Sección de Reporte:</h3>
        <div className="btn-group">
          <button
            className={`btn ${seccionSeleccionada === 'ventas' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSeccionChange('ventas')}
          >
            Ventas
          </button>
          <button
            className={`btn ${seccionSeleccionada === 'buses' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSeccionChange('buses')}
          >
            Buses
          </button>
          <button
            className={`btn ${seccionSeleccionada === 'rutas' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleSeccionChange('rutas')}
          >
            Rutas
          </button>
        </div>
      </div>

      {seccionSeleccionada === 'ventas' && (
        <div className="mt-5">
          <div className="mb-3">
            <DatePicker
              selected={fechaSeleccionada}
              onChange={(date) => handleFechaChange(date)}
              dateFormat="yyyy-MM-dd"
            />
            <button onClick={() => mostrarTabla()}>Buscar</button>
          </div>
          <h3>Reporte de Ventas</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID de Venta</th>
                <th>Nombre</th>
                <th>CI</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Fecha</th>
                <th>Serie</th>
                <th>Precio</th>
                <th>Asiento</th>
                <th>Vendido por</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí puedes mapear tus datos de ventas y crear filas */}
              {resultados.map((venta) => (
                <tr key={venta.id}>
                  <td>{venta.id}</td>
                  <td>{venta.nombre}</td>
                  <td>{venta.ci}</td>
                  <td>{venta.origen}</td>
                  <td>{venta.destino}</td>
                  <td>{venta.fecha}</td>
                  <td>{venta.serie}</td>
                  <td>${venta.precio}</td>
                  <td>{venta.asiento}</td>
                  <td>{venta.emitido_por}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {resultados.length === 0 && <p>No se encontraron resultados.</p>}
        </div>
      )}

      {seccionSeleccionada === 'buses' && (
        <div className="mt-5">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Buscar por modelo..."
              value={busquedaBuses}
              onChange={(e) => handleBusquedaChange(e)}
            />
            <button onClick={() => mostrarTabla()}>Buscar</button>
          </div>
          <h3>Reporte de Buses</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID de Bus</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Placa</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí puedes mapear tus datos de buses y crear filas */}
              {resultados.map((bus) => (
                <tr key={bus.id}>
                  <td>{bus.id}</td>
                  <td>{bus.nombre}</td>
                  <td>{bus.marca}</td>
                  <td>{bus.modelo}</td>
                  <td>{bus.placa}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {resultados.length === 0 && <p>No se encontraron resultados.</p>}
        </div>
      )}

      {seccionSeleccionada === 'rutas' && (
        <div className="mt-5">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Buscar por origen o destino..."
              value={busquedaRutas}
              onChange={(e) => handleBusquedaChange(e)}
            />
            <button onClick={() => mostrarTabla()}>Buscar</button>
          </div>
          <h3>Reporte de Rutas</h3>
          <table className="table">
            <thead>
              <tr>
                <th>ID de Ruta</th>
                <th>Nombre</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Duración</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((ruta) => (
                <tr key={ruta.id}>
                  <td>{ruta.id}</td>
                  <td>{ruta.nombre}</td>
                  <td>{ruta.origen}</td>
                  <td>{ruta.destino}</td>
                  <td>{ruta.duracion}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {resultados.length === 0 && <p>No se encontraron resultados.</p>}
        </div>
      )}
    </div>
  );
};

export default Reportes;
