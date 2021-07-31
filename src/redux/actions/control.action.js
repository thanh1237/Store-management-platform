import * as types from "redux/constants/control.constants";

const control = (obj) => async (dispatch) => {
  dispatch({ type: types.GET_CONTROL_REQUEST, payload: null });
  try {
    dispatch({ type: types.GET_CONTROL_SUCCESS, payload: obj });
  } catch (error) {
    dispatch({ type: types.GET_CONTROL_FAILURE, payload: error });
  }
};

export const controlActions = {
  control,
};
