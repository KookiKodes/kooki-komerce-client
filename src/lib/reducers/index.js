import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { pageReducer } from './pageReducer';
import { cartReducer } from './cartReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  page: pageReducer,
  search: searchReducer,
  cart: cartReducer,
});

export default rootReducer;
