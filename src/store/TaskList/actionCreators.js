import * as actions from "./actions";

//testing thunk
export function createList(payload) {
  return (dispatch, getState) => {
    //
    //axios callback
    dispatch({ type: actions.CREATE_LIST, payload });
  };
}

export function deleteList(payload) {
  return { type: actions.DELETE_LIST, payload };
}

export function cloneList(payload) {
  return { type: actions.CLONE_LIST, payload };
}

export function updateListTitle(payload) {
  return { type: actions.UPDATE_LIST_TITLE, payload };
}

export function updateTaskOrder(payload) {
  return { type: actions.UPDATE_TASK_ORDER, payload };
}
