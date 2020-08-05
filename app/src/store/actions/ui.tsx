export const placeholder = 'placeolder';

export const OPEN_BOARD_MENU = "OPEN_BOARD_MENU";
export const CLOSE_BOARD_MENU = "CLOSE_BOARD_MENU";
export const TOGGLE_BOARD_MENU = "TOGGLE_BOARD_MENU";

export const LOADING_START = "LOADING_START";
export const LOADING_END = "LOADING_END";

export interface OpenBoardMenuAction {
  type: typeof OPEN_BOARD_MENU,
}

export interface CloseBoardMenuAction {
  type: typeof TOGGLE_BOARD_MENU,
}

export interface ToggleBoardMenuAction {
  type: typeof TOGGLE_BOARD_MENU,
}

export interface LoadingStartAction {
  type: typeof LOADING_START,
}

export interface LoadingEndAction {
  type: typeof LOADING_END,
}
