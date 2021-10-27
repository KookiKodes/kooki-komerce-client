import ActionTypes from '../enums/ActionTypes';
import pipe from 'pipe-functions';
import _ from 'lodash';

const localCart = () => {
  const initialState = [];
  if (window) {
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if (localCart) initialState.push(...localCart);
  }
  return initialState;
};

const updateLocal = newState => {
  if (window) localStorage.setItem('cart', JSON.stringify(newState));
  return newState;
};

const add = state => item => [...state, item];

const handleExists = state => item => exists =>
  exists ? state : pipe(item, add(state), updateLocal);

const checkExists = state => payload =>
  _.find(state, item => (item._id === payload._id ? true : false));

const update = state => item =>
  _.map(state, i => (i._id === item._id ? item : i));

const filterOut = state => item => _.filter(state, i => i._id !== item._id);

const handleAdd = (state, item) =>
  pipe(item, checkExists(state), handleExists(state)(item));

const handleUpdate = (state, item) => pipe(item, update(state), updateLocal);

const handleRemove = (state, item) => pipe(item, filterOut(state), updateLocal);

const handleEmpty = state => pipe(state, updateLocal);

export const cartReducer = (state = localCart(), action) => {
  const { type } = action;
  switch (type) {
    case ActionTypes.ADD_TO_CART:
      return handleAdd(state, action.payload);
    case ActionTypes.REMOVE_FROM_CART:
      return handleRemove(state, action.payload);
    case ActionTypes.UPDATE_CART:
      return handleUpdate(state, action.payload);
    case ActionTypes.EMPTY_CART:
      return handleEmpty([]);
    default:
      return state;
  }
};
