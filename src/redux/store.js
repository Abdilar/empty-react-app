import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import RootReducer from './reducer/index';

const appReducer = (state, action) => {
  return RootReducer(state, action)
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    appReducer,
    composeEnhancers(applyMiddleware(ReduxThunk, logger))
);

export default store;
