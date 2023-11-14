import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AgregarPersonal = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    rol: '', // Agregamos la selección de rol
    telefono: '',
    direccion: '',
    dni: '', // Nuevo campo: DNI
    ciudad: '', // Nuevo campo: Ciudad
    pais: '', // Nuevo campo: País
    user: '',
    password: '',
  });

  const [roles, setRoles] = useState([]); // Estado para almacenar los roles

  const {
    nombre,
    apellido,
    correo,
    rol,
    telefono,
    direccion,
    dni,
    ciudad,
    pais,
    user,
    password,
  } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/personal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Personal creado con éxito, puedes redirigir al usuario a la página de detalles del personal
        // Por ejemplo, history.push('/personal-details/' + newPersonalId);
        router.push('/Dashboard');
      } else {
        // Manejar errores de creación de personal
        console.error('Error al crear el personal.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    // Obtener la lista de roles desde la API cuando el componente se monte
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/rol');
        if (response.status === 200) {
          const data = await response.json();
          setRoles(data); // Almacena los roles en el estado
        } else {
          console.error('Error al obtener la lista de roles.');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchRoles(); // Llama a la función para obtener los roles
  }, []); // El segundo argumento [] asegura que se ejecute solo una vez cuando el componente se monte

  return (
    <div className="container">
      <h1 className="mt-5">Agregar Personal</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pais">Usuario:</label>
          <input
            type="text"
            className="form-control"
            id="user"
            name="user"
            value={user}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pais">Password:</label>
          <input
            type="text"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group py-3">
          <label htmlFor="rol">Seleccionar Rol:</label>
          <select
            className="form-control"
            id="rol"
            name="rol"
            value={rol}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar Rol</option>
            {roles.map((role) => (
              <option key={role.id} value={role.nombre}>
                {role.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Personal
        </button>
      </form>
    </div>
  );
};

export default AgregarPersonal;
