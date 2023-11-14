import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import store from '../store';
import { GlobalProvider } from '../GlobalContext'; // Importa tu GlobalProvider

if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.bundle.min.js');
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <GlobalProvider> {/* Agrega el GlobalProvider */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    </Provider>
  );
}
/*
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
*/
export default MyApp;
