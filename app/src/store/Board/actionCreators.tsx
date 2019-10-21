import * as actions from "./actions";

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
