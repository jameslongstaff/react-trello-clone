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
      payload
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

export const createCard = (payload: any) => {};

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
