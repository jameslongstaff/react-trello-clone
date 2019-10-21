import * as actions from "./actions";

//testing thunk
export const createList = (payload: any) => {
  return async (dispatch: any, getState: any) => {
    // const createListUrl = ``;
    // await axios.post(createListUrl, payload);
    // dispatch({ type: actions.CREATE_LIST, payload });
  };
};

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

export const fetchListsPending = (lists: any) => {
  return {
    type: actions.FETCH_LISTS_PENDING,
    lists
  };
};

export const fetchListsSuccess = (lists: any) => {
  return {
    type: actions.FETCH_LISTS_SUCCESS,
    lists
  };
};

export const fetchListsError = (error: any) => {
  return {
    type: actions.FETCH_LISTS_ERROR,
    error
  };
};
