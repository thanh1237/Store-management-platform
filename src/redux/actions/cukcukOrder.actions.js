import * as types from "redux/constants/cukcukOrder.constants";
import cukcukApi from "../api-cukcuk";
import { toast } from "react-toastify";

const getCukcukOrders = () => async (dispatch) => {
  dispatch({ type: types.GET_CUKCUK_ORDER_REQUEST, payload: null });
  try {
    const res = await cukcukApi.post("/v1/orders/paging", {
      Page: 1,
      Limit: 100,
      BranchId: null,
      HaveCustomer: true,
    });
    dispatch({ type: types.GET_CUKCUK_ORDER_SUCCESS, payload: res.data.Data });
  } catch (error) {
    dispatch({ type: types.GET_CUKCUK_ORDER_FAILURE, payload: error });
  }
};

const getSingleCukcukOrder = (ids) => async (dispatch) => {
  let orderDetails = [];
  dispatch({ type: types.GET_SINGLE_CUKCUK_ORDER_REQUEST, payload: null });
  try {
    ids.forEach(async (id) => {
      const res = await cukcukApi.get(`/v1/orders/${id}`);
      await orderDetails.push(res.data.Data);
    });
    dispatch({
      type: types.GET_SINGLE_CUKCUK_ORDER_SUCCESS,
      payload: orderDetails,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_CUKCUK_ORDER_FAILURE, payload: error });
  }
};

const getYesSingleCukcukOrder = (ids) => async (dispatch) => {
  let orderDetails = [];
  dispatch({ type: types.GET_YES_SINGLE_CUKCUK_ORDER_REQUEST, payload: null });
  try {
    ids.forEach(async (id) => {
      const res = await cukcukApi.get(`/v1/orders/${id}`);
      await orderDetails.push(res.data.Data);
    });
    dispatch({
      type: types.GET_YES_SINGLE_CUKCUK_ORDER_SUCCESS,
      payload: orderDetails,
    });
  } catch (error) {
    dispatch({
      type: types.GET_YES_SINGLE_CUKCUK_ORDER_FAILURE,
      payload: error,
    });
  }
};

export const cukcukOrderActions = {
  getCukcukOrders,
  getSingleCukcukOrder,
  getYesSingleCukcukOrder,
};
