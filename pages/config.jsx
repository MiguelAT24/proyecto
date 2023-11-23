// components/Configuracion.js
import React, { useState } from 'react';

const Configuracion = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [idioma, setIdioma] = useState('');
  const [moneda, setMoneda] = useState('');
  const [email, setEmail] = useState('');
  const [notificaciones, setNotificaciones] = useState(false);
  const [impresion, setImpresion] = useState('');
  const [pasarela, setPasarela] = useState('');
  const [seguridad, setSeguridad] = useState('');
  const [tema, setTema] = useState('');
  const [redesSociales, setRedesSociales] = useState('');

  const handleSave = () => {
    // Aquí puedes guardar las configuraciones en el estado global, en localStorage o enviarlas al servidor.
    console.log('Configuraciones guardadas:', {
      apiUrl,
      idioma,
      moneda,
      email,
      notificaciones,
      impresion,
      pasarela,
      seguridad,
      tema,
      redesSociales,
    });
  };

  return (
    <div data-testid="tu-componente" className="container mt-5">
      <h2 className="mb-4">Configuración General</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="apiUrl" className="form-label">URL de la API:</label>
          <input
            type="text"
            className="form-control"
            id="apiUrl"
            placeholder="https://api.tusitio.com"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="idioma" className="form-label">Idioma:</label>
          <input
            type="text"
            className="form-control"
            id="idioma"
            value={idioma}
            onChange={(e) => setIdioma(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="moneda" className="form-label">Moneda:</label>
          <input
            type="text"
            className="form-control"
            id="moneda"
            value={moneda}
            onChange={(e) => setMoneda(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Configuración de Correo Electrónico:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="correo@tusitio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="notificaciones"
            checked={notificaciones}
            onChange={() => setNotificaciones(!notificaciones)}
          />
          <label className="form-check-label" htmlFor="notificaciones">Configuración de Notificaciones</label>
        </div>
        <div className="mb-3">
          <label htmlFor="impresion" className="form-label">Configuración de Impresión de Boletos:</label>
          <input
            type="text"
            className="form-control"
            id="impresion"
            value={impresion}
            onChange={(e) => setImpresion(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pasarela" className="form-label">Configuración de Pago:</label>
          <input
            type="text"
            className="form-control"
            id="pasarela"
            value={pasarela}
            onChange={(e) => setPasarela(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="seguridad" className="form-label">Seguridad:</label>
          <input
            type="password"
            className="form-control"
            id="seguridad"
            value={seguridad}
            onChange={(e) => setSeguridad(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tema" className="form-label">Tema:</label>
          <input
            type="text"
            className="form-control"
            id="tema"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="redesSociales" className="form-label">Integraciones Sociales:</label>
          <input
            type="text"
            className="form-control"
            id="redesSociales"
            value={redesSociales}
            onChange={(e) => setRedesSociales(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>Guardar Configuración</button>
      </form>
    </div>
  );
};

export default Configuracion;
