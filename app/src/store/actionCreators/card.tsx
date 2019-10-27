import * as cardActions from "../actions/card";
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

    return { type: cardActions.CREATE_TASK, payload: { ...payload, id } };
  };
};

export const fetchCardsBegin = () => {
  return { type: cardActions.FETCH_CARDS_BEGIN };
};

export const fetchCards = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(fetchCardsBegin());

    const { boardId } = payload;

    const apiUrl = `http://localhost:4000/api/board/${boardId}/cards`;

    const response = await axios.get(apiUrl);

    const cards = response.data.map((c: any) => {
      const { content, title, _id, listId } = c;
      return {
        content,
        title,
        listId,
        id: _id
      };
    });

    dispatch({
      type: cardActions.FETCH_CARDS_SUCCESS,
      payload: { cards }
    });
  };
};

export const loadCards = (payload: any) => {
  return { type: cardActions.LOAD_CARDS, payload };
};

export const deleteTask = (payload: any) => {
  return { type: cardActions.DELETE_TASK, payload };
};

export const cloneTask = (payload: any) => {
  return { type: cardActions.CLONE_TASK, payload };
};

export const updateTaskTitle = (payload: any) => {
  return { type: cardActions.UPDATE_TASK_TITLE, payload };
};

export const updateTaskContent = (payload: any) => {
  return { type: cardActions.UPDATE_TASK_CONTENT, payload };
};

// export function updateTaskOrder(payload) {
//   return { type: actions.UPDATE_TASK_ORDER, payload };
// }
