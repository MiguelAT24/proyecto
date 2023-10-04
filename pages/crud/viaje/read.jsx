import Head from 'next/head';
import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/router';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener los datos.');
  }
  return response.json();
};

export default function ViajeList() {
  const { data: programacionViajes, error } = useSWR('/api/viajes', fetcher);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/viajes/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Actualiza la lista de programación de viajes después de eliminar
        mutate('/api/viajes');
      } else {
        console.error('Error al eliminar la programación de viaje.');
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
        <title>Lista de Programación de Viajes</title>
      </Head>
      <main>
        <div className="container">
          <h1 className="my-5">Lista de Programación de Viajes</h1>
          <Link legacyBehavior href="/crud/viaje/create">
            <a className="btn btn-primary mb-3">Crear Programación de Viaje</a>
          </Link>
          {programacionViajes ? (
            <div className="container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora de Salida</th>
                    <th>Hora de Llegada</th>
                    <th>Ruta</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Bus</th>
                    <th>Servicio</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {programacionViajes.map((viaje) => (
                    <tr key={viaje.id}>
                      <td>{viaje.fecha}</td>
                      <td>{viaje.ho_sa}</td>
                      <td>{viaje.ho_lle}</td>
                      <td>{viaje.ruta}</td>
                      <td>{viaje.origen}</td>
                      <td>{viaje.destino}</td>
                      <td>{viaje.bus}</td>
                      <td>{viaje.servicio}</td>
                      <td>{viaje.precio}</td>
                      <td>
                        <Link legacyBehavior href={`/crud/viaje/edit/${viaje.id}`}>
                          <a className="btn btn-primary btn-sm mx-2">Editar</a>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(viaje.id)}
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
        </div>
      </main>
    </div>
  );
};

