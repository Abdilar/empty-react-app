import React from 'react';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {MainLayout} from 'layout';

const render = (props, Component) => {
  return props.layout ?
    <MainLayout><Component {...props} /></MainLayout> :
    <Component {...props} />
};

const Public = ({ component: Component, ...props }) => (
  <Route render={() => render(props, Component)} {...props} />
);

Public.defaultProps = {
  layout: true
};

Public.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.bool,
  path: PropTypes.string
};

export {Public};
