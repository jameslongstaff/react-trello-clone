import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import boardReducer from "./store/Board/reducer";
import taskListReducer from "./store/TaskList/reducer";
import taskReducer from "./store/Task/reducer";

import * as serviceWorker from "./serviceWorker";

const rootReducer = combineReducers({
  boards: boardReducer,
  taskLists: taskListReducer,
  tasks: taskReducer
});

const logger = (store: any) => {
  return (next: any) => {
    return (action: any) => {
      console.log("[Middleware] Dispatching", action);
      const result = next(action);
      console.log("[Middleware] next state", store.getState());
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
