import { useEffect, useState } from 'react';
import axios from "axios";

function Nav() {
  const [user, setUser] = useState({
    username: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async () => {
    try {
      const profile = await axios.get("/api/profile");
      setUser(profile.data);
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('No se pudo obtener la información del usuario.');
        }
        const data = await response.json();
        if (data.error) {
          setUser(null);
        } else {
          setUser({ username: data.username });
          getProfile();
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <nav className="navbar bg-dark text-white p-3">
      <div className="container">
        <div className="p-1">Sistema De Ventas De Boletos</div>
        <div>
          {isLoading ? (
            <span>Cargando...</span>
          ) : user ? (
            <span>Usuario: {user.username}</span>
          ) : (
            <span>No autenticado</span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
