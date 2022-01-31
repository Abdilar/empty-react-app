import PropTypes from 'prop-types';
import {PATH} from 'config/routes.config';

export const DEFAULT_PROPS = {
  redirectPath: PATH.ERROR
};

export const PROP_TYPES = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.object,
  redirectPath: PropTypes.string
};