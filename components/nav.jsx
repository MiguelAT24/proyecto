import React, { useEffect, useState } from 'react';
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
    // Realiza una solicitud al servidor para obtener la información del usuario autenticado
    fetch('/api/profile') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la información del usuario.');
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          // El usuario no está autenticado
          setUser(null);
        } else {
          // El usuario está autenticado
          setUser({ username: data.username });
          // Llama a getProfile directamente una vez que el usuario esté autenticado
          getProfile();
        }
      })
      .catch((error) => {
        console.error(error);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
