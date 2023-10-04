
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';



if (typeof window !== 'undefined') {
  require('bootstrap/dist/js/bootstrap.bundle.min.js');
}
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      
    <Component {...pageProps} />
  </Layout>
  );
}

export default MyApp;
