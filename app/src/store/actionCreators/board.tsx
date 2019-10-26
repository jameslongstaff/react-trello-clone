import * as actions from "../actions/board";

export const showTaskModal = (payload: any) => {
  return { type: actions.SHOW_TASK_MODAL, payload };
};

export const hideTaskModal = () => {
  return { type: actions.HIDE_TASK_MODAL };
};

export const createBoard = (payload: any) => {
  return { type: actions.CREATE_BOARD, payload };
};

export const deleteBoard = (payload: any) => {
  return { type: actions.DELETE_BOARD, payload };
};

export const updateBoardTitle = (payload: any) => {
  return { type: actions.UPDATE_BOARD_TITLE, payload };
};

export const fetchBoardBegin = () => {
  return { type: actions.FETCH_BOARD_BEGIN };
};

export const fetchBoard = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(fetchBoardBegin());

    const { boardId } = payload;

    const apiUrl = `http://localhost:4000/api/board/${boardId}`;

    const response = (await fetch(apiUrl).catch(error => {})) as Response;

    const { title, _id } = await response.json();

    dispatch({
      type: actions.FETCH_BOARD_SUCCESS,
      payload: { title, id: _id }
    });
  };
};
