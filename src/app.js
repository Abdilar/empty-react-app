import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer, toast } from "react-toastify";
import AppRouting from './app.route';

import 'normalize.css/normalize.css';
import "react-toastify/dist/ReactToastify.css";
import './assets/styles/global.scss';

const App = () => (
  <React.Fragment>
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
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById('app'));
