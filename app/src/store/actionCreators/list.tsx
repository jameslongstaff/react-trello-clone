import * as listActions from "../actions/list";
import * as boardActions from "../actions/board";
import * as cardActions from "../actions/card";

import axios from "axios";

export const cloneList = (payload: any) => {
  return async (dispatch: any) => {
    const { listId } = payload;

    const apiUrl = `http://localhost:4000/api/list/${listId}/clone`;

    const response = await axios.post(apiUrl, { listId });

    console.log(response.data);

    dispatch({ type: cardActions.CREATE_CLONED_CARDS, payload: response.data.cards });
    dispatch({ type: listActions.CREATE_CLONED_LIST, payload: response.data });
  }
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

export const deleteList = (payload: any) => {
  return async (dispatch: any) => {
    const { listId } = payload;

    const apiUrl = `http://localhost:4000/api/list/${listId}`;

    const response = await axios.delete(apiUrl);

    dispatch({ type: listActions.DELETE_LIST, payload });
    dispatch({ type: cardActions.DELETE_LIST_CARDS, payload: { listId } });
  }
};

export const updateListTitle = (payload: any) => {
  return async (dispatch: any) => {
    const { listId, title } = payload;

    const apiUrl = `http://localhost:4000/api/list/${listId}/update`;

    const response = await axios.patch(apiUrl, { title });

    dispatch({ type: listActions.UPDATE_LIST_TITLE, payload });
  }
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

export function updateListOrder(payload: any) {
  return async (dispatch: any) => {
    const {
      boardId,
      sourceIndex,
      destinationIndex,
      sourceId,
      destinationId,
    } = payload;

    const apiUrl = `http://localhost:4000/api/board/${boardId}/update-list-order`;

    dispatch({ type: listActions.UPDATE_LIST_ORDER, payload });

    const response = await axios.patch(apiUrl, {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    });
  }
}
export function updateCardOrder(payload: any) {
  return async (dispatch: any) => {

    const {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    } = payload;

    const apiUrl = `http://localhost:4000/api/cards/update-order`;

    const response = await axios.patch(apiUrl, {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    });

    dispatch({ type: listActions.UPDATE_CARD_ORDER, payload });
  }
}
