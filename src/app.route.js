import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as Pages from './pages';
import { Header } from './components';

const AppRouting = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path={'/'} component={Pages.HomePage} exact />
      <Route component={Pages.NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouting;
