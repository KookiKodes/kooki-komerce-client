import ActionTypes from '../enums/ActionTypes';

export const pageReducer = (
  state = { loading: false, cartDrawer: false },
  action
) => {
  const { type } = action;
  switch (type) {
    case ActionTypes.CART_DRAWER_ON:
      return { ...state, cartDrawer: true };
    case ActionTypes.CART_DRAWER_OFF:
      return { ...state, cartDrawer: false };
    case ActionTypes.CART_DRAWER_TOGGLE:
      return { ...state, cartDrawer: !state.cartDrawer };
    case ActionTypes.PAGE_LOADING_ON:
      return { ...state, loading: true };
    case ActionTypes.PAGE_LOADING_OFF:
      return { ...state, loading: false };
    default:
      return state;
  }
};
