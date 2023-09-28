// pages/login.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

 
  const handleLogin = async () => {
    try {
      await axios.post('/api/login', { username, password });
      // Redirigir al panel de ventas o a la página deseada después del inicio de sesión exitoso
      router.push('/Dashboard');
    } catch (error) {
      if (error.response) {
        console.error('Error de inicio de sesión:', error.response.data.message);
      } else {
        console.error('Error de inicio de sesión:', error.message);
      }
      
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
      <h1>Iniciar Sesión</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Iniciar Sesión
      </button>
    </div>
  </div>
  );
}
