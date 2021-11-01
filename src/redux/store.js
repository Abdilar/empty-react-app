import {applyMiddleware, createStore, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import {APP_ENVIRONMENT} from 'config/variables.config';
import RootReducer from './reducer/index';

const appReducer = (state, action) => {
  return RootReducer(state, action);
};

const composeEnhancers = (APP_ENVIRONMENT !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);

export {store}
