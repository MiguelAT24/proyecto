import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBook, faBus, faList, faBusAlt, faRoute, faMap, faCalendar, faUser, faUserCog, faLock, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

const AsignarPermisosAUsuario = () => {
  const router = useRouter();
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const opcionesPermisos = [
    {
      title: 'Gestión de Ventas',
      suboptions: [
        { label: 'Realizar Venta', value: 'realizar venta', icon: faShoppingCart },
        { label: 'Reservar Pasaje', value: 'reservar pasaje', icon: faBook },
      ],
    },
    {
      title: 'Gestión de Buses',
      suboptions: [
        { label: 'Agregar Bus', value: 'agregar bus', icon: faBus },
        { label: 'Ver Buses', value: 'ver buses', icon: faList },
        { label: 'Tipo de Bus', value: 'asignar bus', icon: faBusAlt },
      ],
    },
    {
      title: 'Gestión de Rutas',
      suboptions: [
        { label: 'Agregar Ruta', value: 'agregar ruta', icon: faRoute },
        { label: 'Ver Rutas', value: 'ver rutas', icon: faMap },
      ],
    },
    {
      title: 'Programación de Viajes',
      suboptions: [
        { label: 'Agregar Viaje', value: 'agregar viaje', icon: faCalendar },
        { label: 'Ver Viajes', value: 'ver viajes', icon: faList },
      ],
    },
    {
      title: 'Gestión de Personal',
      suboptions: [
        { label: 'Agregar Personal', value: 'agregar personal', icon: faUser },
        { label: 'Perfiles', value: 'perfiles', icon: faUserCog },
        { label: 'Permisos', value: 'permisos', icon: faLock },
      ],
    },
    {
      title: 'Reportes y Estadísticas',
      suboptions: [
        { label: 'Generar Reportes', value: 'generar reportes', icon: faChartBar },
        { label: 'Ver Estadísticas', value: 'ver estadisticas', icon: faChartBar },
      ],
    },
   
  ];

  useEffect(() => {
    // En este efecto, obtendremos la lista de usuarios desde tu API o base de datos.
    // Supongamos que obtienes la lista de usuarios y la almacenas en un array llamado usuarios.

    // Ejemplo de cómo podrías obtener los usuarios desde una API ficticia:
    fetch('/api/personal')
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data); // Almacena la lista de usuarios en el estado.
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []); // Este efecto se ejecutará una vez al cargar el componente.

  const handleUsuarioChange = (e) => {
    setUsuarioSeleccionado(e.target.value);
  };

  const handlePermisoChange = (e) => {
    const permisoSeleccionado = e.target.value;
    if (permisosSeleccionados.includes(permisoSeleccionado)) {
      // Si el permiso ya está seleccionado, quítalo de la lista de permisos seleccionados.
      setPermisosSeleccionados(permisosSeleccionados.filter((permiso) => permiso !== permisoSeleccionado));
    } else {
      // Si el permiso no está seleccionado, agrégalo a la lista de permisos seleccionados.
      setPermisosSeleccionados([...permisosSeleccionados, permisoSeleccionado]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/permisos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: usuarioSeleccionado, permisos: permisosSeleccionados }),
      });

      if (response.ok) {
        // Los permisos se asignaron correctamente, puedes redirigir al usuario a una página de confirmación o al panel de control.
        router.push('/dashboard');
      } else {
        // Maneja el caso en el que la asignación de permisos falla.
        console.error('Error al asignar permisos');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5">Asignar Permisos a un Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="usuario">Seleccionar Usuario:</label>
          <select
            className="form-control"
            id="usuario"
            name="usuario"
            value={usuarioSeleccionado}
            onChange={handleUsuarioChange}
            required
          >
            <option value="">Seleccionar un Usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
              {usuario.nombre}-{usuario.rol}
            </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Seleccionar Permisos:</label>
          {opcionesPermisos.map((opcion) => (
            <div key={opcion.title} className="mb-3">
              <strong>{opcion.title}</strong>
              {opcion.suboptions.map((suboption) => (
                <div key={suboption.label} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={suboption.value}
                    value={suboption.value}
                    checked={permisosSeleccionados.includes(suboption.value)}
                    onChange={handlePermisoChange}
                  />
                  <label className="form-check-label" htmlFor={suboption.value}>
                    <FontAwesomeIcon icon={suboption.icon} className="mr-2" />
                    {suboption.label}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">
          Asignar Permisos
        </button>
      </form>
    </div>
  );
};

export default AsignarPermisosAUsuario;
