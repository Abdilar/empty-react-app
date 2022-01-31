import React from 'react';
import {MainLayout} from "layout";
import {deleteObjectField} from 'utils/functions.util';
import {DEFAULT_PROPS, PROP_TYPES} from './Public.config';

const Public = ({ component: Component, ...props }) => {
  const newProps = deleteObjectField(props, ['layout', 'redirectPath']);

  return props.layout ?
    <MainLayout><Component {...newProps} /></MainLayout> :
    <Component {...newProps} />;
};

Public.defaultProps = DEFAULT_PROPS;
Public.propTypes = PROP_TYPES;

export {Public};
