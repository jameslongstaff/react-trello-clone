import * as actions from "../actions/list";

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

export const fetchListsSuccess = (payload: any) => {
  return { type: actions.FETCH_LISTS_SUCCESS, payload };
};

export const fetchListsBegin = () => {
  return { type: actions.FETCH_LISTS_BEGIN };
};

export const loadLists = (payload: any) => {
  return { type: actions.LOAD_LISTS, payload };
};

export const fetchLists = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(fetchListsBegin());

    const apiUrl = `http://localhost:4000/api/board/${payload.boardId}/lists`;

    const response = (await fetch(apiUrl).catch(error => {
      console.log(error);
    })) as Response;

    const lists = await response.json();

    dispatch(fetchListsSuccess(lists));
  };
};
