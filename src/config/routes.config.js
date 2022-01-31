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
    layout: true,
    routeType: ROUTE_TYPE.PUBLIC
  },
  {
    path: PATH.ERROR,
    component: Page.Error,
    layout: false,
    routeType: ROUTE_TYPE.PUBLIC
  },
  {
    path: PATH.NOT_FOUND,
    component: Page.NotFound,
    layout: false
  },
  {
    path: '*',
    routeType: ROUTE_TYPE.REDIRECT,
    redirectPath: PATH.NOT_FOUND
  }
];
