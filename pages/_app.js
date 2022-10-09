import 'antd/dist/antd.css';
import '../styles/globals.scss';
import { Navbar } from '../components/index';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
