import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import getRootReducer from "./reducers/index.js";
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import "./design/scss/main.scss";
import App from "./App";

//Create the store with thunk middleware and the root reducer.
const initStore = ()=>{

  const persistConfig = {
    key : "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, getRootReducer);

  const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

  const store = createStore(
      persistedReducer,
      enhancer
  );

  const persistor = persistStore(store);

  return {store , persistor};

};


ReactDOM.render(<App store={initStore().store} persistor={initStore().persistor}/>, document.getElementById('root'));



