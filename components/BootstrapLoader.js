import { useEffect } from 'react';

const BootstrapLoader = () => {
  useEffect(() => {
    // Verificar si estamos en el navegador antes de cargar los scripts de Bootstrap
    if (typeof window !== 'undefined') {
      // Cargar los scripts de Bootstrap aquí
      import('bootstrap/dist/js/bootstrap.min.js')
        .then(() => {
          // Los scripts de Bootstrap se han cargado correctamente
        })
        .catch((error) => {
          console.error('Error al cargar los scripts de Bootstrap:', error);
        });
    }
  }, []);

  return null;
};

export default BootstrapLoader;
