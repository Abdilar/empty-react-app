import React from 'react';
import {MainLayout} from 'layout/Main.layout';
import {deleteObjectField} from 'utils/functions.util';
import {DEFAULT_PROPS, PROP_TYPES} from './Public.config';

const Public = ({component: Component, ...props}) => {
  const newProps = deleteObjectField(props, ['layout', 'redirectPath']);

  return (
    <MainLayout layout={props.layout}>
      <Component {...newProps} />
    </MainLayout>
  );
};

Public.defaultProps = DEFAULT_PROPS;
Public.propTypes = PROP_TYPES;

export {Public};
