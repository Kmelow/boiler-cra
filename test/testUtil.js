import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

import combineReducers from '../src/reducers';
import { middlewares } from '../src/configureStore';

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );

  expect(propError).toBeUndefined();
};

/**
 * Create a testing store with imported reducers, middleware and initial state
 * globals: combineReducers and middlewares
 * @param {object} initialState - Initial state for store
 * @function storeFactory
 * @returns {Store} - Redux store
 */
export const storeFactory = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(combineReducers, initialState);
};
