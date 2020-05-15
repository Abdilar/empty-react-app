import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import AppRouting from './app.route';
import store from "./redux/store";

import 'normalize.css/normalize.css';
import "react-toastify/dist/ReactToastify.css";
import './assets/styles/global.scss';

const App = () => (
  <React.Fragment>
    <ReduxProvider store={store}>
      <AppRouting />
    </ReduxProvider>
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
