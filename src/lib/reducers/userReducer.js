import ActionTypes from '../enums/ActionTypes';
import Role from '../enums/Role';

export const userReducer = (
  state = { role: Role.GUEST, loading: true },
  action
) => {
  const { type } = action;
  switch (type) {
    case ActionTypes.LOGIN:
      return action.payload;
    case ActionTypes.LOGOUT:
      return action.payload;
    case ActionTypes.USER_LOADING_ON:
      return { ...state, loading: true };
    case ActionTypes.USER_LOADING_OFF:
      return { ...state, loading: false };
    default:
      return state;
  }
};
