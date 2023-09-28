import Link from 'next/link';
import { useState } from 'react';

const OptionWithSuboptions = ({ title, suboptions }) => {
  const [showSubOptions, setShowSubOptions] = useState(false);

  const toggleSubOptions = () => {
    setShowSubOptions(!showSubOptions);
  };

  return (
    <li className="nav-item dropdown">
      <a
        className={`nav-link dropdown-toggle ${showSubOptions ? 'show' : ''}`}
        href="#"
        role="button"
        onClick={toggleSubOptions}
        aria-expanded={showSubOptions}
      >
        {title}
      </a>
      <ul
        className={`dropdown-menu ${showSubOptions ? 'show' : ''}`}
        aria-labelledby={`dropdown-${title}`}
      >
        {suboptions.map((suboption, index) => (
          <li key={index} className="dropdown-submenu">
            <a className="dropdown-item" href={suboption.link}>
              {suboption.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
};

 const Navbar = ({ username }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.status === 200) {
        // Cierre de sesión exitoso, puedes redirigir al usuario o realizar otras acciones aquí
      } else {
        // Manejar errores de cierre de sesión aquí
      }
    } catch (error) {
      // Manejar errores de red aquí
    }
  };
  
  return (
    <div>
      {/* Primer nav en la parte superior con el nombre del sistema y nombre de usuario */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* Nombre del sistema en la esquina izquierda */}
        <Link href="/Dashboard" className="navbar-brand mx-5">
          Sistema
        </Link>
        <div className="container">
          {/* Nombre del sistema en la esquina izquierda */}
          <ul className="navbar-nav">
          <Link href="" className="navbar-brand">
            Opciones:
          </Link>
            {/* Opción 1 con dos subopciones */}
            <OptionWithSuboptions
              title="Gestion de Buses"
              suboptions={[
                { label: 'Agregar Bus', link: './../crud/create' },
                { label: 'Ver Buses', link: './../crud/read' },
                { label: 'Tipo de Bus', link: './../crud/read' },
                // Puedes agregar más subopciones aquí
              ]}
            />
            {/* Opción 2 con dos subopciones */}
            <OptionWithSuboptions
              title="Gestion de Rutas"
              suboptions={[
                { label: 'Agregar Ruta', link: './../opcion2/subopcion1' },
                { label: 'Ver Rutas', link: './../opcion2/subopcion2' },
                // Puedes agregar más subopciones aquí
              ]}
            />
            <OptionWithSuboptions
              title="Programacion de viajes"
              suboptions={[
                { label: 'Agregar Viaje', link: './../opcion2/subopcion1' },
                { label: 'Ver Viajes', link: './../opcion2/subopcion2' },
                // Puedes agregar más subopciones aquí
              ]}
            />
             <OptionWithSuboptions
              title="Gestion de Personal"
              suboptions={[
                { label: 'Agregar Personal', link: './../opcion2/subopcion1' },
                { label: 'Ver Personal', link: './../opcion2/subopcion2' },
                // Puedes agregar más subopciones aquí
              ]}
            />
               <OptionWithSuboptions
              title="Informes y Estadísticas"
              suboptions={[
                { label: 'Generar Informe', link: './../opcion2/subopcion1' },
                { label: 'Ver Estadísticas', link: './../opcion2/subopcion2' },
                // Puedes agregar más subopciones aquí
              ]}
            />
              <OptionWithSuboptions
              title="Configuración y Seguridad"
              suboptions={[
                { label: 'Administrar Usuarios', link: './../opcion2/subopcion1' },
                { label: 'Configuración General', link: './../opcion2/subopcion2' },
                { label: 'Seguridad', link: './../opcion2/subopcion2' },
                // Puedes agregar más subopciones aquí
              ]}
            />
            {/* Agrega más opciones con sus subopciones según sea necesario */}
          </ul>
          </div>
          {/* Botón de cierre de sesión */}
          <button onClick={handleLogout} className="btn btn-link text-white">
            Cerrar Sesión
          </button>

          {/* Nombre de usuario en la esquina derecha */}
          <div className="navbar-text ml-auto px-5">
            Usuario: {username}
          </div>
        
      </nav>
   </div>
  );
};

export default Navbar;
