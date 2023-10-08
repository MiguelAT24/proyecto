import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '/styles/sidebar.css';
import {
  faBus,
  faList,
  faBusAlt,
  faRoute,
  faMap,
  faCalendar,
  faUser,
  faChartBar,
  faCog,
  faSignOutAlt,
  faHome,
  faShoppingCart,
  faBook,
  faUserCog, // Agregar el icono de perfiles
  faLock,// 
  // Agrega aquí más iconos según sea necesario
} from '@fortawesome/free-solid-svg-icons';

const OptionWithSuboptions = ({ title, suboptions }) => {
  const [showSubOptions, setShowSubOptions] = useState(false);

  const toggleSubOptions = () => {
    setShowSubOptions(!showSubOptions);
  };

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
            <Link legacyBehavior href={suboption.link}>
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
        <br />
        <OptionWithSuboptions
          title="Gestión de Ventas"
          suboptions={[
            { label: '  Realizar Venta de Pasaje', link: '/crud/ventas/create', icon: faShoppingCart },
            { label: '  Reservar Pasaje', link: '/opcion3/subopcion2', icon: faBook },
          ]}
        />
         <br />
        <OptionWithSuboptions
          title="Gestión de Buses"
          suboptions={[
            { label: '  Agregar Bus', link: '/crud/bus/create', icon: faBus },
            { label: '  Ver Buses', link: '/crud/bus/read', icon: faList },
            { label: '  Asignar Bus', link: '/crud/bus/asignar', icon: faUser },
          ]}
        />
        <br />
        <OptionWithSuboptions
          title="Gestión de Rutas"
          suboptions={[
            { label: '  Agregar Ruta', link: '/crud/rutas/create', icon: faRoute },
            { label: '  Ver Rutas', link: '/crud/rutas/read', icon: faMap },
          ]}
        />
        <br />
        <OptionWithSuboptions
          title="Programación de Viajes"
          suboptions={[
            { label: '  Agregar Viaje', link: '/crud/viaje/create', icon: faCalendar },
            { label: '  Ver Viajes', link: '/crud/viaje/read', icon: faList },
          ]}
        />
        <br />

        <OptionWithSuboptions
          title="Gestión de Personal"
          suboptions={[
            { label: '  Agregar Personal', link: '/crud/personal/create', icon: faUser },
            { label: '  Perfiles', link: '/crud/personal/rol', icon: faUserCog },
            { label: '  Permisos', link: '/crud/personal/permisos', icon: faLock },
          ]}
        />
        <br />

        <OptionWithSuboptions
          title="Reportes y Estadísticas"
          suboptions={[
            { label: '  Generar Reportes', link: '/reportes/reporte', icon: faChartBar },
            { label: '  Ver Estadísticas', link: '/reportes/estadistica', icon: faChartBar },
          ]}
        />
         <br />
        <Link legacyBehavior href="/config" className="navbar-brand">
          <a className="nav-link style={{ color: '#ffff' }}">
          <FontAwesomeIcon icon={faCog} className="mr-icon" />
          Configuración General
          </a>
        </Link>
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
