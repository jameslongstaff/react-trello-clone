import * as actions from "./actions";
import * as axios from "axios";

//testing thunk
export const createList = payload => {
  return async (dispatch, getState) => {
    const createListUrl = ``;
    await axios.post(createListUrl, payload);
    dispatch({ type: actions.CREATE_LIST, payload });
  };
};

export const deleteList = payload => {
  return { type: actions.DELETE_LIST, payload };
};

export const cloneList = payload => {
  return { type: actions.CLONE_LIST, payload };
};

export const updateListTitle = payload => {
  return { type: actions.UPDATE_LIST_TITLE, payload };
};

export const updateTaskOrder = payload => {
  return { type: actions.UPDATE_TASK_ORDER, payload };
};

export const fetchListsPending = lists => {
  return {
    type: actions.FETCH_LISTS_PENDING,
    lists
  };
};

export const fetchListsSuccess = lists => {
  return {
    type: actions.FETCH_LISTS_SUCCESS,
    lists
  };
};

export const fetchListsError = error => {
  return {
    type: actions.FETCH_LISTS_ERROR,
    error
  };
};
