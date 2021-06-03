import * as types from "redux/constants/stock.constants";
import api from "redux/api";
import { toast } from "react-toastify";

const getStocks = () => async (dispatch) => {
  dispatch({ type: types.GET_STOCKS_REQUEST, payload: null });
  try {
    const res = await api.get("/stocks");
    dispatch({ type: types.GET_STOCKS_SUCCESS, payload: res.data.data });
  } catch (error) {
    toast.error("Get Stock List Failed");
    dispatch({ type: types.GET_STOCKS_FAILURE, payload: error });
  }
};

const createStock =
  ({
    author,
    estimate,
    note,
    order,
    product,
    real,
    start,
    stockIn,
    stockOut,
  }) =>
  async (dispatch) => {
    dispatch({ type: types.CREATE_STOCK_REQUEST, payload: null });
    try {
      const body = {
        productId: product,
        order,
        userId: author,
        start,
        stockIn,
        stockOut,
        estimate,
        real,
        note,
      };
      const res = await api.post("/stocks", body);
      dispatch({ type: types.CREATE_STOCK_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: types.CREATE_STOCK_FAILURE, payload: error });
    }
  };

export const stockActions = {
  getStocks,
  createStock,
};
