// pages/_app.js
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query'; // Importa QueryClient y QueryClientProvider

import Layout from '../components/Layout';
import store from '../store';
import { GlobalProvider } from '../GlobalContext';

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.bundle.min.js');
}

const queryClient = new QueryClient(); // Crea una instancia de QueryClient

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}> {/* Envuelve con QueryClientProvider */}
        <GlobalProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalProvider>
       
      </QueryClientProvider>
    </Provider>
  );
}

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}

export default MyApp;
