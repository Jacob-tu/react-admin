/*
redux最核心的管理对象store
 */
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // 处理异步action
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
