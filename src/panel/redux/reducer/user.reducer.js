import {
  USER_SET_IS_LOGGED_IN,
  USER_SET_USER,
} from "../action/types";

const initialState = {
  isLoggedIn: false,
  user: {}
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_USER:
      return Object.assign({}, state, { ...state, user: action.data });
    case USER_SET_IS_LOGGED_IN:
      return Object.assign({}, state, { isLoggedIn: action.data });
    default:
      return state;
  }
};

export default UserReducer;
