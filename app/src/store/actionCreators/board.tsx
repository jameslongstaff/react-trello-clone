import * as boardActionCreators from "../actionCreators/board";
import * as listActionCreators from "../actionCreators/list";
import * as cardActionCreators from "../actionCreators/card";

import axios from "axios";
import { apiPath } from "../../config";
import { Board } from "../../models/board";
import ActionUtility from "../../utilities/ActionUtility";
import { ToggleBoardMenuAction, OpenBoardMenuAction, CloseBoardMenuAction, HideTaskModalAction, ShowTaskModalAction, DeleteBoardAction, LoadBoardAction, LoadBoardsAction, FetchBoardsBeginAction, FetchBoardsSuccessAction, FetchBoardBeginAction, TOGGLE_BOARD_MENU, OPEN_BOARD_MENU, CLOSE_BOARD_MENU, SHOW_TASK_MODAL, HIDE_TASK_MODAL, CREATE_BOARD, DELETE_BOARD, LOAD_BOARD, LOAD_BOARDS, FETCH_BOARDS_BEGIN, FETCH_BOARDS_SUCCESS, FETCH_BOARD_BEGIN, FETCH_BOARD_SUCCESS, UPDATE_BOARD_TITLE } from "../actions/board";

export const toggleBoardMenu = (): ToggleBoardMenuAction => {
  return ActionUtility.createAction(TOGGLE_BOARD_MENU);
};

export const openBoardMenu = (): OpenBoardMenuAction => {
  return ActionUtility.createAction(OPEN_BOARD_MENU);
};

export const closeBoardMenu = (): CloseBoardMenuAction => {
  return ActionUtility.createAction(CLOSE_BOARD_MENU);
};

export const showTaskModal = (payload: { cardId: string }): ShowTaskModalAction => {
  return ActionUtility.createAction(SHOW_TASK_MODAL, payload);
};

export const hideTaskModal = (): HideTaskModalAction => {
  return ActionUtility.createAction(HIDE_TASK_MODAL);
};

export const createBoard = (payload: Board) => {
  return async (dispatch: any) => {
    const response = await axios.post(`${apiPath}/board/create`, { title: payload.title });

    dispatch(ActionUtility.createAction(CREATE_BOARD, response.data));
  }
};

export const deleteBoard = (payload: any): DeleteBoardAction => {
  return ActionUtility.createAction(DELETE_BOARD, payload);
};

export const loadBoard = (payload: any): LoadBoardAction => {
  return ActionUtility.createAction(LOAD_BOARD, payload);
};

export const loadBoards = (payload: any): LoadBoardsAction => {
  return ActionUtility.createAction(LOAD_BOARDS, payload);
};

export const fetchBoardsBegin = (): FetchBoardsBeginAction => {
  return ActionUtility.createAction(FETCH_BOARDS_BEGIN);
};

export const fetchBoardsSuccess = (): FetchBoardsSuccessAction => {
  return ActionUtility.createAction(FETCH_BOARDS_SUCCESS);
}

export const fetchBoardBegin = (): FetchBoardBeginAction => {
  return ActionUtility.createAction(FETCH_BOARD_BEGIN);
};

export const fetchBoardSuccess = (): FetchBoardsSuccessAction => {
  return ActionUtility.createAction(FETCH_BOARD_SUCCESS);
}

export const updateBoardTitle = (payload: any) => {
  return async (dispatch: any) => {
    const { boardId, title } = payload;

    await axios.patch(`${apiPath}/board/${boardId}/update`, { title });

    dispatch(ActionUtility.createAction(UPDATE_BOARD_TITLE, payload));
  }
};

export const fetchBoards = () => {
  return async (dispatch: any) => {
    dispatch(ActionUtility.createAction(FETCH_BOARDS_BEGIN));

    const response = await axios.get(`${apiPath}/boards`);

    dispatch(boardActionCreators.loadBoards(response.data));

    dispatch(ActionUtility.createAction(FETCH_BOARDS_SUCCESS));
  };
};

export const fetchBoard = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(ActionUtility.createAction(FETCH_BOARD_BEGIN));
    const apiUrl = `${apiPath}/board/${payload.boardId}`;

    const response = await axios.get(apiUrl);

    dispatch(boardActionCreators.loadBoard(response.data));
    dispatch(cardActionCreators.loadCards(response.data));
    dispatch(listActionCreators.loadLists(response.data));

    dispatch(ActionUtility.createAction(FETCH_BOARD_SUCCESS));
  };
};
