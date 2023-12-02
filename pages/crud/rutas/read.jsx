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

export default function RouteList() {
  const { data: rutas, error } = useSWR('/api/rutas', fetcher);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/rutas/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Actualiza la lista de rutas después de eliminar
        mutate('/api/rutas');
      } else {
        console.error('Error al eliminar la ruta.');
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
        <title>Lista de Rutas</title>
      </Head>
      <main>
        <div className="container">
          <h1 className="my-5">Listas de Rutas</h1>
          <Link legacyBehavior href="/crud/rutas/create">
            <a className="btn btn-primary mb-3">Agregar Nueva Ruta</a>
          </Link>
          {rutas ? (
            <div className="container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre de la Ruta</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Duración</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {rutas.map((route) => (
                    <tr key={route.id}>
                      <td>{route.id}</td>
                      <td>{route.nombre}</td>
                      <td>{route.origen}</td>
                      <td>{route.destino}</td>
                      <td>{route.duracion}</td>
                      <td>
                        <Link legacyBehavior href={`/crud/rutas/edit/${route.id}`}>
                          <a className="btn btn-primary btn-sm mx-2">Editar</a>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(route.id)} // Llama a handleDelete al hacer clic
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
}
