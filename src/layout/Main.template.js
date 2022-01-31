import {cloneElement} from 'react';
import {LAYOUT} from 'config/layout.config';
import {deleteObjectField, isEmptyObject} from 'utils/functions.util';
import * as Layout from './components';

const whichLayout = (props) => {
  if (isEmptyObject(props.layout)) {
    return cloneElement(props.children, deleteObjectField(props, ['layout', 'children']));
  }

  switch (props.layout.name) {
    case LAYOUT.PRIMARY:
      return <Layout.Primary {...props} />;
    case LAYOUT.SECONDARY:
      return <Layout.Secondary {...props} />;
    default:
      return cloneElement(props.children, deleteObjectField(props, ['layout', 'children']));
  }
};

export const MainTemplate = props => whichLayout(props);
