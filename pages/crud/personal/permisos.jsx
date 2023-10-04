import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Importa los iconos necesarios (asegúrate de tener los íconos de FontAwesome importados)
import { faShoppingCart, faBook, faBus, faList, faBusAlt, faRoute, faMap, faCalendar, faUser, faUserCog, faLock, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

const SeleccionarRolYPermisos = () => {
  const router = useRouter();
  const [rolSeleccionado, setRolSeleccionado] = useState('');
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

  const opcionesRoles = [
    'Administrador',
    'Vendedor',
    'Conductor',
    'Pasajero',
  ];

  const opcionesPermisos = [
    {
      title: 'Gestión de Ventas',
      suboptions: [
        { label: 'Realizar Venta de Pasaje', value: 'realizar-venta', icon: faShoppingCart },
        { label: 'Reservar Pasaje', value: 'reservar-pasaje', icon: faBook },
      ],
    },
    {
      title: 'Gestión de Buses',
      suboptions: [
        { label: 'Agregar Bus', value: 'agregar-bus', icon: faBus },
        { label: 'Ver Buses', value: 'ver-buses', icon: faList },
        { label: 'Tipo de Bus', value: 'tipo-de-bus', icon: faBusAlt },
      ],
    },
    {
      title: 'Gestión de Rutas',
      suboptions: [
        { label: 'Agregar Ruta', value: 'agregar-ruta', icon: faRoute },
        { label: 'Ver Rutas', value: 'ver-rutas', icon: faMap },
      ],
    },
    {
      title: 'Programación de Viajes',
      suboptions: [
        { label: 'Agregar Viaje', value: 'agregar-viaje', icon: faCalendar },
        { label: 'Ver Viajes', value: 'ver-viajes', icon: faList },
      ],
    },
    {
      title: 'Gestión de Personal',
      suboptions: [
        { label: 'Agregar Personal', value: 'agregar-personal', icon: faUser },
        { label: 'Perfiles', value: 'perfiles', icon: faUserCog },
        { label: 'Permisos', value: 'permisos', icon: faLock },
      ],
    },
    {
      title: 'Reportes y Estadísticas',
      suboptions: [
        { label: 'Generar Reportes', value: 'generar-reportes', icon: faChartBar },
        { label: 'Ver Estadísticas', value: 'ver-estadisticas', icon: faChartBar },
      ],
    },
    {
      title: 'Configuración y Seguridad',
      suboptions: [
        { label: 'Configuración General', value: 'configuracion-general', icon: faCog },
        { label: 'Seguridad', value: 'seguridad', icon: faCog },
      ],
    },
  ];

  const handleRolChange = (e) => {
    setRolSeleccionado(e.target.value);
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
        body: JSON.stringify({ rol: rolSeleccionado, permisos: permisosSeleccionados }),
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
      <h1 className="mt-5">Asignar Permisos a un Rol de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4">
          <label htmlFor="rol">Seleccionar Rol:</label>
          <select
            className="form-control"
            id="rol"
            name="rol"
            value={rolSeleccionado}
            onChange={handleRolChange}
            required
          >
            <option value="">Seleccionar un Rol</option>
            {opcionesRoles.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
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

export default SeleccionarRolYPermisos;
