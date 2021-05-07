import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {PAGE} from '../../config/routes.config';
import {IS_LOGGED_IN} from '../../config/variables.config';
import {MainLayout} from "../../layout";

const render = (Component, props) => {
  const isLoggedIn = JSON.parse(localStorage.getItem(IS_LOGGED_IN)) || false;

  return isLoggedIn ?
    props.layout ?
      <MainLayout><Component {...props} /></MainLayout> :
      <Component {...props} /> :
    <Redirect to={`/${PAGE.ERROR}`} />
};

const Private = ({ component: Component, ...props }) => (
  <Route render={() => render(Component, props)} {...props} />
);

Private.defaultProps = {
  layout: true
};

Private.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.bool,
  path: PropTypes.string
};

export {Private};

// TODO: configure redirect path in variable
