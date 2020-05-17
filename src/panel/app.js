import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import AppRouting from './route/app.route';
import store from './redux/store';

import 'normalize.css/normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/common/asset/styles/style.scss';
import '@/panel/asset/styles/style.scss';

const App = () => (
  <ReduxProvider store={store}>
    <AppRouting />
    <ToastContainer
        autoClose={5000}
        position={toast.POSITION.TOP_CENTER}
        newestOnTop
        closeOnClick
        pauseOnVisibilityChange
        draggable={false}
        pauseOnHover
    />
  </ReduxProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
