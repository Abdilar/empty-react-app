import React from 'react';
import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import {ROUTE_TYPE, STATIC_PATHS} from 'config/routes.config';
import history from 'utils/history.util';
import {History, Private, Protected, Public} from './components';

const renderRoutes = props => {
  const {component, routeType, path, ...newProps} = props;

  switch (routeType) {
    case ROUTE_TYPE.REDIRECT:
      return <Route key={path} path={path} element={<Navigate to={props.redirectPath}/>}/>;
    case ROUTE_TYPE.PRIVATE:
      return <Route key={path} path={path} element={<History><Private component={component} {...newProps} /></History>}/>;
    case ROUTE_TYPE.PROTECTED:
      return <Route key={path} path={path} element={<History><Protected component={component} {...newProps} /> </History>}/>;
    case ROUTE_TYPE.PUBLIC:
      return <Route key={path} path={path} element={<History><Public component={component} {...newProps} /> </History>}/>;
    default:
      return <Route key={path} path={path} element={<History><Public component={component} {...newProps} /> </History>}/>;
  }
};

const AppRouting = () => (
  <BrowserRouter history={history}>
    <Routes>
      {
        STATIC_PATHS.map(item => renderRoutes(item))
      }
    </Routes>
  </BrowserRouter>
);

export {AppRouting};
