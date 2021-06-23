import React from 'react';
import ReactDOM from 'react-dom';
import i18next from 'i18next';
import moment from 'moment';
import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';
import {App} from './App.js';
import {PAGE} from './config/routes.config';
import {
  ACCESS_TOKEN,
  APP_DIR,
  APP_LANGUAGE,
  APP_DEFAULT_LANGUAGE,
  IS_LOGGED_IN,
  REFRESH_TOKEN,
  SENTRY_URL
} from './config/variables.config';
import reportWebVitals from './reportWebVitals';
import {getAppLanguage, setAppDirection, setAppLanguage, toCamelCase} from './utils/functions.util';
import packageJSON from '../package.json';
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

const setAppInfo = () => {
  const appName = toCamelCase(packageJSON.name, '-');
  window[appName] = {version: packageJSON.version};
}

const initialSentry = () => {
  if (!SENTRY_URL) return;
  Sentry.init({
    dsn: SENTRY_URL,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const initProject = async () => {
  setAppLanguage(APP_LANGUAGE, APP_DEFAULT_LANGUAGE);
  await loadDynamicScripts();
  const dir = i18next.dir(getAppLanguage());
  setAppDirection(APP_DIR, dir);
  await loadDynamicStyles(dir);
  moment.locale(getAppLanguage());
  renderDOM();
};

try {
  setAppInfo();
  resetApp();
  initialSentry()
  initProject();
} catch (e) {
  history.push(PAGE.ERROR);
  renderDOM();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
