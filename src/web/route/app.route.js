import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import * as Route from './components';
import * as Pages from '../pages';

const AppRouting = () => (
  <BrowserRouter basename={'/web'}>
    <Switch>
      <Route.PublicRoute path={'/'} component={Pages.HomePage} exact />
      <Route.PublicRoute component={Pages.NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouting;
