import * as types from "redux/constants/product.constants";
const initialState = {
  products: [],
  totalPageNum: 1,
  selectedBlog: null,
  loading: false,
  singleProduct: null,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case types.GET_PRODUCTS_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_PRODUCTS_SUCCESS:
      return { ...state, loading: false };
    case types.CREATE_PRODUCTS_FAILURE:
      return { ...state, loading: false };

    case types.UPDATE_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_PRODUCTS_SUCCESS:
      return { ...state, singleProduct: payload, loading: false };
    case types.UPDATE_PRODUCTS_FAILURE:
      return { ...state, loading: false };

    case types.GET_SINGLE_PRODUCT_REQUEST:
      return { ...state, loading: true };
    case types.GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, singleProduct: payload, loading: false };
    case types.GET_SINGLE_PRODUCT_FAILURE:
      return { ...state, loading: false };

    case types.DELETE_PRODUCT_REQUEST:
      return { ...state, products: payload, loading: true };
    case types.DELETE_PRODUCT_SUCCESS:
      return { ...state, loading: false };
    case types.DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default productReducer;
