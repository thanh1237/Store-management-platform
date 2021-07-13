import * as types from "redux/constants/auth.constants";
const initialState = {
  user: {},
  isAuthenticated: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.LOGIN_CUKCUK_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_CUKCUK_SUCCESS:
      localStorage.setItem("cukcukAccessToken", payload.AccessToken);
      return {
        ...state,
        cukcukAccessToken: payload.AccessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.LOGIN_CUKCUK_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return { ...state, loading: false };
    case types.REGISTER_FAILURE:
      return { ...state, loading: false };

    case types.LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
