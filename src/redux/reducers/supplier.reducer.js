import * as types from "redux/constants/supplier.constants";
const initialState = {
  suppliers: [],
  totalPageNum: 1,
  loading: false,
  singleSupplier: null,
};

const supplierReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_SUPPLIERS_REQUEST:
      return { ...state, loading: true };
    case types.GET_SUPPLIERS_SUCCESS:
      return {
        ...state,
        suppliers: payload,
        loading: false,
      };
    case types.GET_SUPPLIERS_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_SUPPLIER_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_SUPPLIER_SUCCESS:
      return { ...state, loading: false };
    case types.CREATE_SUPPLIER_FAILURE:
      return { ...state, loading: false };

    case types.UPDATE_SUPPLIER_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_SUPPLIER_SUCCESS:
      return { ...state, singleSupplier: payload, loading: false };
    case types.UPDATE_SUPPLIER_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_SUPPLIER_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_SUPPLIER_SUCCESS:
      return { ...state, singleSupplier: payload.data, loading: false };
    case types.GET_SINGLE_SUPPLIER_FAILURE:
      return { ...state, loading: false };

    case types.DELETE_SUPPLIER_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_SUPPLIER_SUCCESS:
      return { ...state, loading: false };
    case types.DELETE_SUPPLIER_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default supplierReducer;
