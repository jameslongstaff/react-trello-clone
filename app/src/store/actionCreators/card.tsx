import * as cardActions from "../actions/card";
import * as listActions from "../actions/list";

import _ from "lodash";

import axios from "axios";

export const createTask = (payload: any) => {
  return async (dispatch: any) => {
    const apiUrl = `http://localhost:4000/api/card/create`;

    const { title, listId } = payload;

    const response = await axios.post(apiUrl, {
      title,
      listId
    });

    const id = response.data._id;

    dispatch({
      type: cardActions.CREATE_TASK,
      payload: { ...payload, id }
    });

    dispatch(addCardToList({ id, listId }));
  };
};

export const addCardToList = (payload: any) => {
  return {
    type: listActions.ADD_CARD_TO_LIST,
    payload: payload
  };
};

export const createCard = (payload: any) => { };

export const loadCards = (payload: any) => {
  return { type: cardActions.LOAD_CARDS, payload };
};

export const deleteCard = (payload: any) => {

  return async (dispatch: any) => {

    const { cardId, listId } = payload;

    const apiUrl = `http://localhost:4000/api/card/${cardId}/delete`;

    await axios.delete(apiUrl);

    dispatch({ type: listActions.REMOVE_CARD_FROM_LIST, payload });
    dispatch({ type: cardActions.DELETE_CARD, payload });
  }
};

export const cloneCard = (payload: any) => {
  return async (dispatch: any) => {
    const { cardId } = payload;

    const apiUrl = `http://localhost:4000/api/card/${cardId}/clone`;

    const response = await axios.post(apiUrl, { cardId });

    const { title, content, sortOrder, listId } = response.data;

    const card = {
      id: response.data._id,
      title,
      content,
      sortOrder,
      listId,
    }

    dispatch({ type: cardActions.CLONE_CARD, payload: card });
    dispatch({ type: listActions.ADD_CARD_TO_LIST, payload: card });
  }
};

export const updateCard = (payload: any) => {
  return async (dispatch: any) => {

    const { cardId, title } = payload;

    const apiUrl = `http://localhost:4000/api/card/${cardId}/update`;

    await axios.patch(apiUrl, { title });

    dispatch({ type: cardActions.UPDATE_CARD, payload });
  }
};

export const updateTaskContent = (payload: any) => {
  return { type: cardActions.UPDATE_TASK_CONTENT, payload };
};

export const beginQuickEdit = (payload: any) => {
  return { type: cardActions.BEGIN_QUICK_EDIT, payload };
}

export const cancelQuickEdit = (payload: any) => {
  return { type: cardActions.CANCEL_QUICK_EDIT, payload };
}
