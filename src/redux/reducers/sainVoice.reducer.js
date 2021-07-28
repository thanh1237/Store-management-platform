import * as types from "redux/constants/sainVoice.constants";
const initialState = {
  sainVoice: [],
  totalPageNum: 1,
  loading: false,
};

const sainVoiceReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_SAINVOICE_REQUEST:
      return { ...state, loading: true };
    case types.GET_SAINVOICE_SUCCESS:
      return {
        ...state,
        sainVoice: payload,
        loading: false,
      };
    case types.GET_SAINVOICE_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default sainVoiceReducer;
