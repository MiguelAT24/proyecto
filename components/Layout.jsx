import SideNavbar from './Navbar';
import { useRouter } from 'next/router';
import Nav from './nav'; 

const Layout = ({ children}) => {
  const router = useRouter();

  // Verificar si la página actual es la de inicio de sesión
  const isLoginPage = router.pathname === '/login';

  // Mostrar el Navbar solo en las páginas que no sean la de inicio de sesión
  if (isLoginPage) {
    return <main>{children}</main>;
  }

  return (
    <div>
      <div>
        {/* Pasa el nombre de usuario autenticado como prop al componente Nav */}
        <Nav />
      </div>
      <div className='row'>
        <div className='col-2 p-3'>
          <SideNavbar />
        </div>
        <div className='col-10'>
          <div className='container'>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
