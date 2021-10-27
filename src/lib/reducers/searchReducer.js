import ActionTypes from '../enums/ActionTypes';

export const searchReducer = (state = { text: '' }, action) => {
  const { type } = action;
  switch (type) {
    case ActionTypes.SEARCH_QUERY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
