import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useGlobalContext } from '../GlobalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '/styles/sidebar.css';
import {
  faBus,
  faList,
  faRoute,
  faMap,
  faCalendar,
  faUser,
  faChartBar,
  faSignOutAlt,
  faHome,
  faShoppingCart,
  faBook,
  faUserCog,
  faLock,
  faRobot,
  // Agrega aquí más iconos según sea necesario
} from '@fortawesome/free-solid-svg-icons';

const OptionWithSuboptions = ({ title, suboptions }) => {
  const { userPermissions, updatePermissions } = useGlobalContext();
  const [showSubOptions, setShowSubOptions] = useState(userPermissions.includes(title));

  const toggleSubOptions = () => {
    const newShowSubOptions = !showSubOptions;
    setShowSubOptions(newShowSubOptions);

    // Actualizar el estado global de los permisos
    const newPermissions = newShowSubOptions
      ? [...userPermissions, title]
      : userPermissions.filter((perm) => perm !== title);

    updatePermissions(newPermissions);
  };

  // Resto del código...

  const handleMouseEnter = (event) => {
    event.currentTarget.classList.add('hovered');
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.classList.remove('hovered');
  };

  return (
    <li
      className={`nav-item dropdown ${showSubOptions ? 'show' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        className={`nav-link dropdown-toggle`}
        href="#"
        role="button"
        onClick={toggleSubOptions}
        aria-expanded={showSubOptions}
      >
        <FontAwesomeIcon icon={suboptions[0].icon} className="mr-icon" />
        {title}
      </a>
      <ul
        className={`dropdown-menu ${showSubOptions ? 'show' : ''}`}
        aria-labelledby={`dropdown-${title}`}
      >
        {suboptions.map((suboption, index) => (
          
          <li
            key={index}
            className="dropdown-submenu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link legacyBehavior href={suboption.link} >
              <a className="dropdown-item">
                <FontAwesomeIcon icon={suboption.icon} className="mr-icon" />
                {suboption.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

const SideNavbar = () => {
  const router = useRouter();
  const { userPermissions } = useGlobalContext();

  const { query } = router;

  const hasPermission = (permission) => {
    // Verifica si userPermissions está definido, no es null y no es undefined
    return userPermissions && userPermissions.includes(permission);
  };


  const logout = async () => {
    try {
      const res = await axios.get('/api/logout');
      // console.log(res);
    } catch (error) {
      console.error(error.message);
    }
    router.push('/login');
  };

  return (
    <div className="sidebar bg-dark p-5">
    <ul className="navbar-nav py-5 px-1 ">
      <Link legacyBehavior href="/Dashboard" className="navbar-brand">
        <a className="nav-link style={{ color: '#ffff' }}">
          <FontAwesomeIcon icon={faHome} className="mr-icon" />
          Inicio
        </a>
      </Link>
      <Link legacyBehavior href="/ChatBot" className="navbar-brand">
        <a className="nav-link style={{ color: '#ffff' }}">
          <FontAwesomeIcon icon={faRobot} className="mr-icon" />
          Chat
        </a>
      </Link>

        {/* Gestión de Ventas */}
        {hasPermission('realizar venta') || hasPermission('reservar pasaje') ? (
          <OptionWithSuboptions
            title="Gestión de Ventas"
            suboptions={[
              { label: '  realizar venta', link: '/crud/ventas/create', icon: faShoppingCart },
              { label: '  reservar pasaje', link: '/opcion3/subopcion2', icon: faBook },
            ]}
            query={query}
          />
        ) : null}
        
        {/* Gestión de Buses */}
        {hasPermission('agregar bus') || hasPermission('ver buses') || hasPermission('asignar-bus') ? (
          <OptionWithSuboptions
            title="Gestión de Buses"
            suboptions={[
              { label: '  agregar bus', link: '/crud/bus/create', icon: faBus },
              { label: '  ver buses', link: '/crud/bus/read', icon: faList },
              { label: '  asignar bus', link: '/crud/bus/asignar', icon: faUser },
            ]}
            query={query}
          />
        ) : null}

        {/* Gestión de Rutas */}
        {hasPermission('agregar ruta') || hasPermission('ver rutas') ? (
          <OptionWithSuboptions
            title="Gestión de Rutas"
            suboptions={[
              { label: '  agregar ruta', link: '/crud/rutas/create', icon: faRoute },
              { label: '  ver rutas', link: '/crud/rutas/read', icon: faMap },
            ]}
          />
        ) : null}

        {/* Programación de Viajes */}
        {hasPermission('agregar viaje') || hasPermission('ver viajes') ? (
          <OptionWithSuboptions
            title="Programación de Viajes"
            suboptions={[
              { label: '  agregar viaje', link: '/crud/viaje/create', icon: faCalendar },
              { label: '  ver viajes', link: '/crud/viaje/read', icon: faList },
            ]}
          />
        ) : null}

        {/* Gestión de Personal */}
        {hasPermission('agregar personal') || hasPermission('perfiles') || hasPermission('permisos') ? (
          <OptionWithSuboptions
            title="Gestión de Personal"
            suboptions={[
              { label: '  agregar personal', link: '/crud/personal/create', icon: faUser },
              { label: '  perfiles', link: '/crud/personal/rol', icon: faUserCog },
              { label: '  permisos', link: '/crud/personal/permisos', icon: faLock },
            ]}
          />
        ) : null}

        {/* Reportes y Estadísticas */}
        {hasPermission('generar reportes') || hasPermission('ver estadisticas') ? (
          <OptionWithSuboptions
            title="Reportes y Estadísticas"
            suboptions={[
              { label: '  generar reportes', link: '/reportes/reporte', icon: faChartBar },
              { label: '  ver estadísticas', link: '/reportes/estadistica', icon: faChartBar },
            ]}
          />
        ) : null}

      </ul>
      <div className='container text-center p-4'>
        <button onClick={logout} className="btn btn-info text-white btn-sm">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-icon" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
