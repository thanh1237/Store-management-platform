import * as types from "redux/constants/order.constants";
import api from "redux/api";
import { toast } from "react-toastify";

const getOrders = () => async (dispatch) => {
  dispatch({ type: types.GET_ORDERS_REQUEST, payload: null });
  try {
    const res = await api.get("/orders");
    dispatch({ type: types.GET_ORDERS_SUCCESS, payload: res.data.data });
  } catch (error) {
    toast.error("Get Order List Failed");
    dispatch({ type: types.GET_ORDERS_FAILURE, payload: error });
  }
};

export const orderActions = {
  getOrders,
};
