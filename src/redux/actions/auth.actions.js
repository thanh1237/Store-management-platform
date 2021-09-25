import * as types from "../constants/auth.constants";
import api from "../api";
import cukcukApi from "../api-cukcuk";
import { toast } from "react-toastify";
import crypto from "crypto";

const loginCukcuk = () => async (dispatch) => {
  dispatch({ type: types.LOGIN_CUKCUK_REQUEST, payload: null });
  try {
    const date = new Date();
    const appSecret = process.env.REACT_APP_SECRET_KEY;
    const string = JSON.stringify({
      AppID: "CUKCUKOpenPlatform",
      Domain: "bake",
      LoginTime: date,
    });
    const hash = crypto
      .createHmac("sha256", appSecret)
      .update(string)
      .digest("hex");
    const res = await cukcukApi.post("/Account/Login", {
      AppID: "CUKCUKOpenPlatform",
      Domain: "bake",
      LoginTime: date,
      SignatureInfo: hash,
    });
    dispatch({ type: types.LOGIN_CUKCUK_SUCCESS, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_CUKCUK_FAILURE, payload: error });
  }
};

const loginRequest =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST, payload: null });
    try {
      const res = await api.post("/auth/login", { email, password });
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
      const name = res.data.data.user.name;
      dispatch(loginCukcuk());
      toast.success(`Welcome back ${name}`);
    } catch (error) {
      console.log(error);
      dispatch({ type: types.LOGIN_FAILURE, payload: error });
    }
  };

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const register =
  ({ firstName, lastName, email, password, role }) =>
  async (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST, payload: null });
    try {
      const name = `${firstName} ${lastName}`;
      const res = await api.post("/users", { name, email, password, role });
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
      toast.success(`Create Manager ${name}, role: ${role} Success!`);
    } catch (error) {
      dispatch({ type: types.REGISTER_FAILURE, payload: error });
    }
  };

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.removeItem("accessToken");
  localStorage.removeItem("cukcukAccessToken");
  dispatch({ type: types.LOGOUT, payload: null });
};

const authActions = {
  loginRequest,
  register,
  getCurrentUser,
  logout,
  loginCukcuk,
};
export default authActions;
