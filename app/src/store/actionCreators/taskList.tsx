import * as actions from "../actions/taskList";

export const deleteList = (payload: any) => {
  return { type: actions.DELETE_LIST, payload };
};

export const cloneList = (payload: any) => {
  return { type: actions.CLONE_LIST, payload };
};

export const updateListTitle = (payload: any) => {
  return { type: actions.UPDATE_LIST_TITLE, payload };
};

export const updateTaskOrder = (payload: any) => {
  return { type: actions.UPDATE_TASK_ORDER, payload };
};

export const fetchListsBegin = () => {
  return { type: actions.FETCH_LISTS_BEGIN };
};

export const fetchLists = (payload: any) => {};
