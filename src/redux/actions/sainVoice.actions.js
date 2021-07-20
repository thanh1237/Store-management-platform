import * as types from "redux/constants/sainVoice.constants";
import cukcukApi from "../api-cukcuk";
import { toast } from "react-toastify";

const getSainVoices = () => async (dispatch) => {
  dispatch({ type: types.GET_SAINVOICE_REQUEST, payload: null });
  try {
    const res = await cukcukApi.post("/v1/sainvoices/paging", {
      Page: 1,
      Limit: 100,
      BranchId: null,
      HaveCustomer: true,
    });
    dispatch({ type: types.GET_SAINVOICE_SUCCESS, payload: res.data.Data });
  } catch (error) {
    toast.error("Get Sain voces List Failed");
    dispatch({ type: types.GET_SAINVOICE_FAILURE, payload: error });
  }
};

export const sainVoiceActions = {
  getSainVoices,
};
