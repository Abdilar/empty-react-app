import React from 'react';
import {Navigate} from 'react-router-dom';
import {IS_LOGGED_IN} from 'config/variables.config';
import {MainLayout} from 'layout/Main.layout';
import {deleteObjectField} from 'utils/functions.util';
import {DEFAULT_PROPS, PROP_TYPES} from './Private.config';

const Private = ({component: Component, ...props}) => {
  const isLoggedIn = JSON.parse(localStorage.getItem(IS_LOGGED_IN)) || false;
  if (!isLoggedIn) return <Navigate to={props.redirectPath}/>;

  const newProps = deleteObjectField(props, ['layout', 'redirectPath']);
  return (
    <MainLayout layout={props.layout}>
      <Component {...newProps} />
    </MainLayout>
  );
};

Private.defaultProps = DEFAULT_PROPS;
Private.propTypes = PROP_TYPES;

export {Private};
