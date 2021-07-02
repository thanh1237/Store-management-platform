import * as types from "redux/constants/stock.constants";
const initialState = {
  stocks: [],
  totalPageNum: 1,
  selectedBlog: null,
  loading: false,
};

const stockReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_STOCKS_REQUEST:
      return { ...state, loading: true };
    case types.GET_STOCKS_SUCCESS:
      return {
        ...state,
        stocks: payload,
        loading: false,
      };
    case types.GET_STOCKS_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_STOCK_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_STOCK_SUCCESS:
      return {
        ...state,
        stocks: payload,
        loading: false,
      };
    case types.CREATE_STOCK_FAILURE:
      return { ...state, loading: false };

    case types.UPDATE_STOCK_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_STOCK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_STOCK_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default stockReducer;
