import { Board } from "../../models/board";

export const SHOW_TASK_MODAL = "SHOW_TASK_MODAL";
export const HIDE_TASK_MODAL = "HIDE_TASK_MODAL";

export const OPEN_BOARD_MENU = "OPEN_BOARD_MENU";
export const CLOSE_BOARD_MENU = "CLOSE_BOARD_MENU";
export const TOGGLE_BOARD_MENU = "TOGGLE_BOARD_MENU";

export const DELETE_BOARD = "DELETE_BOARD";
export const CREATE_BOARD = "CREATE_BOARD";
export const UPDATE_BOARD_TITLE = "UPDATE_BOARD_TITLE";
export const ADD_LIST_TO_BOARD = "ADD_LIST_TO_BOARD";

export const FETCH_BOARD = "FETCH_BOARD";
export const FETCH_BOARD_BEGIN = "FETCH_BOARD_BEGIN";
export const FETCH_BOARD_SUCCESS = "FETCH_BOARD_SUCCESS";
export const LOAD_BOARD = "LOAD_BOARD";

export const FETCH_BOARDS = "FETCH_BOARDS";
export const FETCH_BOARDS_BEGIN = "FETCH_BOARDS_BEGIN";
export const FETCH_BOARDS_SUCCESS = "FETCH_BOARDS_SUCCESS";
export const LOAD_BOARDS = "LOAD_BOARDS";

export interface ShowTaskModalAction {
  type: typeof SHOW_TASK_MODAL,
  payload: { cardId: string },
}

export interface HideTaskModalAction {
  type: typeof HIDE_TASK_MODAL,
}

export interface OpenBoardMenuAction {
  type: typeof OPEN_BOARD_MENU,
}

export interface CloseBoardMenuAction {
  type: typeof TOGGLE_BOARD_MENU,
}

export interface ToggleBoardMenuAction {
  type: typeof TOGGLE_BOARD_MENU,
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

export interface FetchBoardBeginAction {
  type: typeof FETCH_BOARD_BEGIN,
}

export interface FetchBoardSuccessAction {
  type: typeof FETCH_BOARD_SUCCESS,
}

export interface LoadBoardAction {
  type: typeof LOAD_BOARD,
}

export interface FetchBoardsAction {
  type: typeof FETCH_BOARDS,
}

export interface FetchBoardsBeginAction {
  type: typeof FETCH_BOARDS_BEGIN,
}

export interface FetchBoardsSuccessAction {
  type: typeof FETCH_BOARDS_SUCCESS,
}

export interface LoadBoardsAction {
  type: typeof LOAD_BOARDS,
}




