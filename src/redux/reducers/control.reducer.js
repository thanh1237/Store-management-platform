import * as types from "redux/constants/control.constants";
const initialState = {
  obj: {},
  loading: false,
};

const controlReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CONTROL_REQUEST:
      return { ...state, loading: true };
    case types.GET_CONTROL_SUCCESS:
      return {
        ...state,
        obj: payload,
        loading: false,
      };
    case types.GET_CONTROL_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default controlReducer;
