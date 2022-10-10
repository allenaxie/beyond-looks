import 'antd/dist/antd.css';
import '../styles/globals.scss';
import { Navbar } from '../components/index';
import {store} from '../app/store';
import {Provider} from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
