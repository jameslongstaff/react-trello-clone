import * as listActions from "../actions/list";
import * as boardActions from "../actions/board";

import axios from "axios";

export const deleteList = (payload: any) => {
  return { type: listActions.DELETE_LIST, payload };
};

export const cloneList = (payload: any) => {
  return { type: listActions.CLONE_LIST, payload };
};

export const updateTaskOrder = (payload: any) => {
  return { type: listActions.UPDATE_TASK_ORDER, payload };
};

export const fetchListsSuccess = (payload: any) => {
  return { type: listActions.FETCH_LISTS_SUCCESS, payload };
};

export const fetchListsBegin = () => {
  return { type: listActions.FETCH_LISTS_BEGIN };
};

export const loadLists = (payload: any) => {
  return { type: listActions.LOAD_LISTS, payload };
};

export const addListToBoard = (payload: any) => {
  return {
    type: boardActions.ADD_LIST_TO_BOARD,
    payload: payload
  };
};

export const updateListTitle = (payload: any) => {
  return async (dispatch: any) => {

    const { listId, title } = payload;

    const apiUrl = `http://localhost:4000/api/list/${listId}/update`;

    const response = await axios.patch(apiUrl, { title });

    dispatch({ type: listActions.UPDATE_LIST_TITLE, payload });
  }
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

export const createList = (payload: any) => {
  return async (dispatch: any) => {
    const apiUrl = `http://localhost:4000/api/list/create`;

    const { title, boardId } = payload;

    const response = await axios.post(apiUrl, {
      title,
      boardId
    });

    const id = response.data._id;

    dispatch({
      type: listActions.CREATE_LIST,
      payload: { ...payload, id }
    });

    dispatch(addListToBoard({ id, boardId }));
  };
};
