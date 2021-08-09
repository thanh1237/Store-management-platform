import * as types from "redux/constants/supplier.constants";
import api from "redux/api";
import { toast } from "react-toastify";

const getSuppliers = () => async (dispatch) => {
  dispatch({ type: types.GET_SUPPLIERS_REQUEST, payload: null });
  try {
    const res = await api.get("/suppliers");
    dispatch({ type: types.GET_SUPPLIERS_SUCCESS, payload: res.data.data });
  } catch (error) {
    toast.error("Get Supplier List Failed");
    dispatch({ type: types.GET_SUPPLIERS_FAILURE, payload: error });
  }
};

const createSupplier = (body) => async (dispatch) => {
  dispatch({ type: types.CREATE_SUPPLIER_REQUEST, payload: null });
  try {
    const res = await api.post("/suppliers", body);
    dispatch({ type: types.CREATE_SUPPLIER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.CREATE_SUPPLIER_FAILURE, payload: error });
  }
};

const updateSupplier = (id, form) => async (dispatch) => {
  dispatch({ type: types.UPDATE_SUPPLIER_REQUEST, payload: null });
  try {
    const body = form;
    const res = await api.put(`/suppliers/${id}`, body);
    dispatch({ type: types.UPDATE_SUPPLIER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_SUPPLIER_FAILURE, payload: error });
  }
};

const deleteSuppler = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_SUPPLIER_REQUEST, payload: null });
  try {
    const res = await api.delete(`/suppliers/${id}`);
    dispatch({ type: types.DELETE_SUPPLIER_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: types.DELETE_SUPPLIER_FAILURE, payload: error });
  }
};

const getSingleSuppler = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_SUPPLIER_REQUEST, payload: null });
  try {
    const res = await api.get(`/suppliers/${id}`);
    dispatch({ type: types.GET_SINGLE_SUPPLIER_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_SUPPLIER_FAILURE, payload: error });
  }
};

export const supplierActions = {
  getSuppliers,
  createSupplier,
  updateSupplier,
  deleteSuppler,
  getSingleSuppler,
};
