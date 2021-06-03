import * as types from "redux/constants/product.constants";
import api from "redux/api";
import { toast } from "react-toastify";

const getProducts = () => async (dispatch) => {
  dispatch({ type: types.GET_PRODUCTS_REQUEST, payload: null });
  try {
    const res = await api.get("/products");
    dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: res.data.data });
  } catch (error) {
    toast.error("Get Product List Failed");
    dispatch({ type: types.GET_PRODUCTS_FAILURE, payload: error });
  }
};
const getSingleProduct = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.get(`/products/${id}`);
    dispatch({
      type: types.GET_SINGLE_PRODUCT_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_PRODUCT_FAILURE, payload: error });
  }
};
const createProducts =
  ({ type, unit, name, cost, price, ingredients, quantity, stock }) =>
  async (dispatch) => {
    const body = {
      type,
      unit,
      name,
      cost,
      price,
      ingredients,
      quantity,
      stock,
    };
    dispatch({ type: types.CREATE_PRODUCTS_REQUEST, payload: null });
    try {
      const res = await api.post("/products", body);
      dispatch({ type: types.CREATE_PRODUCTS_SUCCESS, payload: res.data.data });
      toast.success("Create Product Success");
    } catch (error) {
      toast.error("Create Product Failed");
      dispatch({ type: types.CREATE_PRODUCTS_FAILURE, payload: error });
    }
  };

const updateProduct = (id, form) => async (dispatch) => {
  const body = form;
  dispatch({ type: types.UPDATE_PRODUCTS_REQUEST, payload: null });
  try {
    const res = await api.put(`/products/${id}`, body);
    dispatch({ type: types.UPDATE_PRODUCTS_SUCCESS, payload: res.data.data });
    toast.success(`Update Product ${form.name} Success`);
  } catch (error) {
    toast.error("Update Product Failed");
    dispatch({ type: types.UPDATE_PRODUCTS_FAILURE, payload: error });
  }
};

const deleteProduct = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.delete(`/products/${id}`);
    dispatch({ type: types.DELETE_PRODUCT_SUCCESS, payload: res.data.data });
    toast.success("Delete Product Success");
    dispatch(getProducts());
  } catch (error) {
    toast.error("Delete Product Fail");
    dispatch({ type: types.DELETE_PRODUCT_FAILURE, payload: error });
  }
};

export const productActions = {
  getProducts,
  deleteProduct,
  createProducts,
  getSingleProduct,
  updateProduct,
};
