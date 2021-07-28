import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";
import routeReducer from "./route.reducer";
import userReducer from "./user.reducer";
import stockReducer from "./stock.reducer";
import orderReducer from "./order.reducer";
import sainVoiceReducer from "./sainVoice.reducer";
import cukcukOrderReducer from "./cukcukOrder.reducer";

export default combineReducers({
  auth: authReducer,
  product: productReducer,
  route: routeReducer,
  user: userReducer,
  stock: stockReducer,
  order: orderReducer,
  sainVoice: sainVoiceReducer,
  cukcukOrder: cukcukOrderReducer,
});
