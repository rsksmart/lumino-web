import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import getRootReducer from "./reducers/index.js";
import "./design/scss/main.scss";

import thunkMiddleware from "redux-thunk";
import App from "./App";

//Create the store with thunk middleware and the root reducer. Adds the swagger rest client as parameter for thunk
const getStore = initialState => {
  const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
  return createStore(getRootReducer, initialState, enhancer);
};

const Store = getStore();

ReactDOM.render(<App store={Store} />, document.getElementById("root"));

