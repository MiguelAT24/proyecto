// GlobalContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [userPermissions, setUserPermissions] = useState([]);

  useEffect(() => {
    // Cargar los permisos desde el localStorage al montar el componente
    const storedPermissions = JSON.parse(localStorage.getItem('userPermissions')) || [];
    setUserPermissions(storedPermissions);
  }, []);

  const updatePermissions = (permissions) => {
    setUserPermissions(permissions);
    // Almacenar los permisos en el localStorage cada vez que se actualizan
    localStorage.setItem('userPermissions', JSON.stringify(permissions));
  };

  return (
    <GlobalContext.Provider value={{ userPermissions, updatePermissions }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
