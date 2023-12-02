import SideNavbar from './SideNavbar';
import { useRouter } from 'next/router';
import Nav from './Navbar';

const Layout = ({ children }) => {
  const router = useRouter();

  // Verificar si la página actual es la de inicio de sesión
  const isLoginPage = router.pathname === '/login';

  // Mostrar el Navbar solo en las páginas que no sean la de inicio de sesión
  if (isLoginPage) {
    return <main>{children}</main>;
  }

  return (
    <div>
      <div   className="container-fluid"
      style={{
        backgroundImage: `url('/../img/image4.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        filter: "opacity(0.9)",
      }}>

      <div className='py-2'>
        {/* Pasa el nombre de usuario autenticado como prop al componente Nav */}
        <Nav />
      </div>
      <div className='row'>
        <div className='col-2 p-3'>
          <SideNavbar />
        </div>
        <div className='col-10 px-2 py-3'  style={{ backgroundColor: "white" , filter: "opacity(0.8)",}}>
          <div className='container px-2 py-3' >
            <main>{children}</main>
          </div>
        </div>

      </div>

    </div>
    </div>
  );
};

export default Layout;
