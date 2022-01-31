import PropTypes from 'prop-types';
import {PATH} from 'config/routes.config';

export const DEFAULT_PROPS = {
  layout: true,
  redirectPath: PATH.HOME
};

export const PROP_TYPES = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.bool,
  redirectPath: PropTypes.string
};