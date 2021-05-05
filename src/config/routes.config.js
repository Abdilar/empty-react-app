export const PAGE = {
  ERROR: 'error',
  HOME: '',
  NOT_FOUND: 'not-found'
};

export const ROUTE_TYPE = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  PROTECTED: 'PROTECTED',
  REDIRECT: 'REDIRECT'
};

export const STATIC_PATHS = [
  {
    name: PAGE.HOME,
    type: 'home',
    layout: true,
    routeType: ROUTE_TYPE.PRIVATE
  },
  {
    name: PAGE.ERROR,
    type: 'error',
    layout: false,
    routeType: ROUTE_TYPE.PUBLIC
  },
  {
    name: PAGE.NOT_FOUND,
    type: 'notFound',
    layout: false,
  }
];
