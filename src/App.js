import React from 'react';
import Helmet from 'react-helmet';
import {useTranslation} from 'react-i18next';
import {Provider as ReduxProvider} from 'react-redux';
import {ToastContainer, toast, Slide} from 'react-toastify';
import {AUTO_CLOSE_TIME, LIMIT} from 'config/toast.config';
import {store} from 'redux/store';
import {AppRouting} from 'route/App.route';

const App = () =>  {
  const {t} = useTranslation();
  const description = t('app.defaultDescription');
  const siteName = t('app.defaultSiteName');
  const title = t('app.defaultTitle');

  return (
    <ReduxProvider store={store}>
      <Helmet>
        <title>{siteName}</title>
        <link rel="icon" href="#" type="image/png"/>
        <meta property="og:url" content={window.location.hostname} />
        <meta property="twitter:description" content={description} />
        <meta property="og:description" content={description}/>
        <meta name="description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={title} />
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
