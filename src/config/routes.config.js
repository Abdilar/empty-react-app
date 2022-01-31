import {LAYOUT} from 'config/layout.config';
import * as Page from 'page';

export const PATH = {
  ERROR: '/error',
  HOME: '/',
  NOT_FOUND: '/not-found'
};

export const ROUTE_TYPE = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  PROTECTED: 'PROTECTED',
  REDIRECT: 'REDIRECT'
};

export const STATIC_PATHS = [
  {
    path: PATH.HOME,
    component: Page.Home,
    layout: {
      name: LAYOUT.PRIMARY
    },
    routeType: ROUTE_TYPE.PUBLIC
  },
  {
    path: PATH.ERROR,
    component: Page.Error,
    layout: null,
    routeType: ROUTE_TYPE.PUBLIC
  },
  {
    path: PATH.NOT_FOUND,
    component: Page.NotFound,
    layout: {
      name: LAYOUT.SECONDARY
    }
  },
  {
    path: '*',
    routeType: ROUTE_TYPE.REDIRECT,
    redirectPath: PATH.NOT_FOUND
  }
];
