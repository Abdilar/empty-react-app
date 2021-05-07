import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import moment from 'moment';
import App from './App.js';
import {PAGE} from './config/routes.config';
import {ACCESS_TOKEN, APP_DIR, APP_LANGUAGE, APP_DEFAULT_LANGUAGE, IS_LOGGED_IN, REFRESH_TOKEN} from './config/variables.config';
import {fetchConfigs} from './redux/action/general.action';
import {store} from './redux/store';
import reportWebVitals from './reportWebVitals';
import {getAppLanguage, isEmptyArray, parseQuery, setAppDirection, setAppLanguage} from './utils/functions.util';
import history from './utils/history.util';
import './utils/customIcons.util';
import 'moment/locale/fa';

const renderDOM = () => ReactDOM.render(<App/>, document.getElementById('root'));

const resetApp = () => {
  localStorage.removeItem(IS_LOGGED_IN);
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const loadDynamicScripts = async () => {
  await (async () => {
    return await import('./i18n')
  })();
};

const loadDynamicStyles = async (dir) => {
  await (async () => {
    return await import(`uikit/dist/css/uikit${dir === 'rtl' ? '-rtl' : ''}.min.css`);
  })();

  await (async () => {
    return await import('react-toastify/dist/ReactToastify.css');
  })();

  await (async () => {
    return await import('./asset/styles/style.scss');
  })();
};

const initProject = async () => {
  await store.dispatch(fetchConfigs());
  setAppLanguage(APP_LANGUAGE, APP_DEFAULT_LANGUAGE);
  await loadDynamicScripts();
  const dir = i18next.dir(getAppLanguage());
  setAppDirection(APP_DIR, dir);
  await loadDynamicStyles(dir);
  moment.locale(getAppLanguage());


  history.push(PAGE.ERROR);
  renderDOM();
};

try {
  resetApp();
  initProject();
} catch (e) {
  history.push(PAGE.ERROR);
  renderDOM();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
