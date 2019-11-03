import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import App from "./App";

import boardReducer from "./store/reducers/board";
import taskListReducer from "./store/reducers/list";
import taskReducer from "./store/reducers/card";
import uiReducer from "./store/reducers/ui";

import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  boards: boardReducer,
  lists: taskListReducer,
  cards: taskReducer,
  ui: uiReducer,
});

const logger = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      // console.log("[Middleware] Dispatching", action);
      const result = next(action);
      // console.log("[Middleware] next state", store.getState());
      return result;
    };
  };
};

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
