import React from 'react';
import {Redirect, Router, Switch} from 'react-router-dom';
import {ROUTE_TYPE, STATIC_PATHS} from '../config/routes.config';
import * as Page from '../page';
import history from '../utils/history.util';
import * as Route from './components';

const MAP_COMPONENT = {
  error: Page.Error,
  home: Page.Home,
  notFound: Page.NotFound
};

const renderRoutes = props => {
  const {from, routeType, type, name, ...newProps} = props;
  switch (routeType) {
    case ROUTE_TYPE.REDIRECT:
      return <Redirect from={`/${from}`} to={`/${name}`} exact />;
    case ROUTE_TYPE.PRIVATE:
      return <Route.Private component={MAP_COMPONENT[type]} path={`/${name}`} {...newProps} exact />;
    case ROUTE_TYPE.PROTECTED:
      return <Route.Protected component={MAP_COMPONENT[type]} path={`/${name}`} {...newProps} exact />;
    case ROUTE_TYPE.PUBLIC:
      return <Route.Public component={MAP_COMPONENT[type]} path={`/${name}`} {...newProps} exact />;
    default:
      return <Route.Public component={MAP_COMPONENT[type]} {...newProps} />;
  }
};

const AppRouting = () => (
  <Router history={history}>
    <Switch>
      {
        STATIC_PATHS.map(item => renderRoutes(item))
      }
    </Switch>
  </Router>
);

export default AppRouting;
