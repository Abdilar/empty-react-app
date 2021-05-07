import React from 'react';
import Helmet from 'react-helmet';
import {useTranslation} from 'react-i18next';
import {Provider as ReduxProvider} from 'react-redux';
import {ToastContainer, toast, Slide} from 'react-toastify';
import {AUTO_CLOSE_TIME, LIMIT} from './config/toast.config';
import {store} from './redux/store';
import {AppRouting} from './route/App.route';

const App = () =>  {
  const {t} = useTranslation();
  const title = t('app.defaultSiteName');

  return (
    <ReduxProvider store={store}>
      <Helmet>
        <title>{title}</title>
        <link rel="icon" href="#" type="image/png"/>
        <meta property="og:url" content={window.location.hostname} />
        <meta property="twitter:description" content={t('app.defaultDescription')} />
        <meta property="og:description" content={t('app.defaultDescription')}/>
        <meta name="description" content={t('app.defaultDescription')} />
        <meta property="twitter:title" content={t('app.defaultTitle')} />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={t('app.defaultTitle')} />
      </Helmet>
      <AppRouting />
      <ToastContainer
        position={toast.POSITION.BOTTOM_LEFT}
        autoClose={AUTO_CLOSE_TIME}
        hideProgressBar={false}
        limit={LIMIT}
        transition={Slide}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ReduxProvider>
  )
}

export {App};
