import * as actions from "../actions/task";
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

    return { type: actions.CREATE_TASK, payload: { ...payload, id } };
  };
};

export const fetchCardsBegin = () => {
  return { type: actions.FETCH_CARDS_BEGIN };
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
      type: actions.FETCH_CARDS_SUCCESS,
      payload: { cards }
    });
  };
};

export const deleteTask = (payload: any) => {
  return { type: actions.DELETE_TASK, payload };
};

export const cloneTask = (payload: any) => {
  return { type: actions.CLONE_TASK, payload };
};

export const updateTaskTitle = (payload: any) => {
  return { type: actions.UPDATE_TASK_TITLE, payload };
};

export const updateTaskContent = (payload: any) => {
  return { type: actions.UPDATE_TASK_CONTENT, payload };
};

// export function updateTaskOrder(payload) {
//   return { type: actions.UPDATE_TASK_ORDER, payload };
// }
