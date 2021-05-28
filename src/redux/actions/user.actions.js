import * as types from "redux/constants/user.constants";
import api from "redux/api";
import { toast } from "react-toastify";

const getUsers = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_USERS_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users");
    dispatch({ type: types.GET_USERS_SUCCESS, payload: res.data.data });
  } catch (error) {
    toast.error("Get Managers List Failed");
    dispatch({ type: types.GET_USERS_FAILURE, payload: error });
  }
};

const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: types.DELETE_USER_REQUEST, payload: null });
  try {
    const res = await api.delete(`/users/${id}`);
    dispatch({ type: types.DELETE_USER_SUCCESS, payload: res.data.data });
    toast.success("Delete Manager Success");
    dispatch(getUsers());
  } catch (error) {
    toast.error("Delete Manager Fail");
    dispatch({ type: types.DELETE_USER_FAILURE, payload: error });
  }
};

export const userActions = {
  getUsers,
  deleteUser,
};
