// pages/read.js
import Head from 'next/head';
import useSWR, { mutate } from 'swr'; 
import Link from 'next/link';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return response.json();
};

export default function BusList() {
  const { data: products, error } = useSWR('/api/bus', fetcher);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/bus/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Actualiza la lista de productos después de eliminar
        mutate('/api/bus');
      } else {
        console.error('Error al eliminar el producto.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  if (error) {
    return <div>Error al cargar los datos.</div>;
  }

  return (
    <div>
      <Head>
        <title>Lista de Autobuses</title>
      </Head>
      <main>
        <div className="container">
      
        <h1 className="my-5">Listas de Buses</h1>
        <Link  legacyBehavior href="/crud/bus/create">
          <a className="btn btn-primary mb-3">Agregar Nuevo Bus</a>
        </Link>
      </div>
        {products ? (
            <div className='container'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Placa</th>
                <th>Asiento</th>
                <th>Capacidad</th>
                <th>Tipo de Autobús</th>
                <th>Notas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((bus) => (
                <tr key={bus.id}>
                  <td>{bus.nombre}</td>
                  <td>{bus.id}</td>
                  <td>{bus.marca}</td>
                  <td>{bus.modelo}</td>
                  <td>{bus.placa}</td>
                  <td>{bus.asientos}</td>
                  <td>{bus.capacidad}</td>
                  <td>{bus.tip_bus}</td>
                  <td>{bus.adicional}</td>
                  <td>
                  <Link legacyBehavior href={`/crud/bus/edit/${bus.id}`}>
                        <a className="btn btn-primary btn-sm mx-2">Editar</a>
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(bus.id)} // Llama a handleDelete al hacer clic
                      >
                        Eliminar
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <div>Cargando...</div>
        )}
      </main>
    </div>
  );
}
