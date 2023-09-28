// components/Layout.js
import Navbar from './Navbar';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  // Verificar si la página actual es la de inicio de sesión
  const isLoginPage = router.pathname === '/login';

  // Mostrar el Navbar solo en las páginas que no sean la de inicio de sesión deeee
  if (isLoginPage) {
    return <main>{children}</main>;
  }

  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
