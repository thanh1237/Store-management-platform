import * as types from "redux/constants/cukcukOrder.constants";
const initialState = {
  orders: [],
  totalPageNum: 1,
  loading: false,
  singleOrder: null,
};

const cukcukOrderReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CUKCUK_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CUKCUK_ORDER_SUCCESS:
      return {
        ...state,
        orders: payload,
        loading: false,
      };
    case types.GET_CUKCUK_ORDER_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_CUKCUK_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_CUKCUK_ORDER_SUCCESS:
      return { ...state, singleOrder: payload, loading: false };
    case types.GET_SINGLE_CUKCUK_ORDER_FAILURE:
      return { ...state, loading: true };

    default:
      return state;
  }
};

export default cukcukOrderReducer;
