import { Board } from "../../models/board";

export const SHOW_TASK_MODAL = "SHOW_TASK_MODAL";
export const HIDE_TASK_MODAL = "HIDE_TASK_MODAL";

export const DELETE_BOARD = "DELETE_BOARD";
export const CREATE_BOARD = "CREATE_BOARD";
export const UPDATE_BOARD_TITLE = "UPDATE_BOARD_TITLE";
export const ADD_LIST_TO_BOARD = "ADD_LIST_TO_BOARD";

export const FETCH_BOARD = "FETCH_BOARD";
export const LOAD_BOARD = "LOAD_BOARD";

export const FETCH_BOARDS = "FETCH_BOARDS";
export const LOAD_BOARDS = "LOAD_BOARDS";

export interface ShowTaskModalAction {
  type: typeof SHOW_TASK_MODAL,
  payload: { cardId: string },
}

export interface HideTaskModalAction {
  type: typeof HIDE_TASK_MODAL,
}

export interface DeleteBoardAction {
  type: typeof DELETE_BOARD,
}

export interface CreateBoardAction {
  type: typeof CREATE_BOARD,
  payload: Board,
}

export interface UpdateBoardTitleAction {
  type: typeof UPDATE_BOARD_TITLE,
}

export interface AddListToBoardAction {
  type: typeof ADD_LIST_TO_BOARD,
}

export interface FetchBoardAction {
  type: typeof FETCH_BOARD,
  payload: Board,
}

export interface LoadBoardAction {
  type: typeof LOAD_BOARD,
}

export interface FetchBoardsAction {
  type: typeof FETCH_BOARDS,
}

export interface LoadBoardsAction {
  type: typeof LOAD_BOARDS,
}




