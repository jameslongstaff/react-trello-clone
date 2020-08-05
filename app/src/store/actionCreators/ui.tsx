import {
  OpenBoardMenuAction,
  ToggleBoardMenuAction,
  CloseBoardMenuAction,
  TOGGLE_BOARD_MENU,
  OPEN_BOARD_MENU,
  CLOSE_BOARD_MENU
} from "../actions/ui";

import ActionUtility from "../../utilities/ActionUtility";

export const toggleBoardMenu = (): ToggleBoardMenuAction => {
  return ActionUtility.createAction(TOGGLE_BOARD_MENU);
};

export const openBoardMenu = (): OpenBoardMenuAction => {
  return ActionUtility.createAction(OPEN_BOARD_MENU);
};

export const closeBoardMenu = (): CloseBoardMenuAction => {
  return ActionUtility.createAction(CLOSE_BOARD_MENU);
};