import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import callApi from './callApi';
import rootReducer from './rootReducer';

// Redux dev tools
let devTools = (f) => f;

const enableReduxDevtools = process.browser
  && process.env.NODE_ENV !== 'production'
  && window.__REDUX_DEVTOOLS_EXTENSION__;

if (enableReduxDevtools) {
  devTools = window.__REDUX_DEVTOOLS_EXTENSION__();
}

export const configureStore = (initialState = {}) => createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument(callApi)),
    devTools,
  ),
);
