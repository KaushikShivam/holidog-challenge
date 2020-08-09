import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../redux/rootReducer';
import { middlewares } from '../redux/store';

/**
 * Create a test store with reducers, middleware,and initial state
 *  globals: rootReducer, middlewares.
 * @function storeFactory
 * @param {object} initialState Initial state
 * @returns {store} Redux store
 */
export const storeFactory = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
};

/**
 * Find component to test
 * @function findComponentWithAttr
 * @param {ShallowWarapper} wrapper Wrapper to find
 * @param {string} attrName Attribute to find
 * @returns {JSX.Element}
 */
export const findComponentWithAttr = (wrapper, attrName) => {
  const component = wrapper.find(`[data-test='${attrName}']`);
  return component;
};
