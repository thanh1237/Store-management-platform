import * as types from "redux/constants/user.constants";
const initialState = {
  users: [],
  totalPageNum: 1,
  selectedUser: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_USERS_REQUEST:
      return { ...state, loading: true };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.GET_USERS_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_USER_SUCCESS:
      return { ...state, loading: false };
    case types.DELETE_USER_FAILURE:
      return { ...state, loading: false };

    case types.CHANGE_PASS_REQUEST:
      return { ...state, loading: true };
    case types.CHANGE_PASS_SUCCESS:
      return { ...state, loading: false };
    case types.CHANGE_PASS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
