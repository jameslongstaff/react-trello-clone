import * as actions from "./actions";

export function showTaskModal(payload) {
  return { type: actions.SHOW_TASK_MODAL, payload };
}

export function hideTaskModal(payload) {
  return { type: actions.HIDE_TASK_MODAL, payload };
}

export function createBoard(payload) {
  return { type: actions.CREATE_BOARD, payload };
}

export function deleteBoard(payload) {
  return { type: actions.DELETE_BOARD, payload };
}

export function updateBoardTitle(payload) {
  return { type: actions.UPDATE_BOARD_TITLE, payload };
}
