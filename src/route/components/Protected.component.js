import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {PAGE} from 'config/routes.config';
import {IS_LOGGED_IN} from 'config/variables.config';

const render = (Component, props) => {
  const isLoggedIn = JSON.parse(localStorage.getItem(IS_LOGGED_IN)) || false;

  return !isLoggedIn ?
    <Component {...props} /> :
    <Redirect to={`/${PAGE.HOME}`} />
};

const Protected = ({ component: Component, ...props }) => <Route render={() => render(Component, props)} {...props} />;

Protected.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string
};

export {Protected};

// TODO: configure redirect path in variable
