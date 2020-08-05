import * as boardActionCreators from "../actionCreators/board";
import * as listActionCreators from "../actionCreators/list";
import * as cardActionCreators from "../actionCreators/card";

import axios from "axios";
import { apiPath } from "../../config";
import { Board } from "../../models/board";
import ActionUtility from "../../utilities/ActionUtility";
import { HideTaskModalAction, ShowTaskModalAction, DeleteBoardAction, LoadBoardAction, LoadBoardsAction, SHOW_TASK_MODAL, HIDE_TASK_MODAL, CREATE_BOARD, DELETE_BOARD, LOAD_BOARD, LOAD_BOARDS, UPDATE_BOARD_TITLE } from "../actions/board";
import { LOADING_START, LOADING_END } from "../actions/ui";

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

export const updateBoardTitle = (payload: any) => {
  return async (dispatch: any) => {
    const { boardId, title } = payload;

    await axios.patch(`${apiPath}/board/${boardId}/update`, { title });

    dispatch(ActionUtility.createAction(UPDATE_BOARD_TITLE, payload));
  }
};

export const fetchBoards = () => {
  return async (dispatch: any) => {
    dispatch(ActionUtility.createAction(LOADING_START));

    const response = await axios.get(`${apiPath}/boards`);

    dispatch(boardActionCreators.loadBoards(response.data));

    dispatch(ActionUtility.createAction(LOADING_END));
  };
};

export const fetchBoard = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(ActionUtility.createAction(LOADING_START));
    const apiUrl = `${apiPath}/board/${payload.boardId}`;

    const response = await axios.get(apiUrl);

    dispatch(boardActionCreators.loadBoard(response.data));
    dispatch(cardActionCreators.loadCards(response.data));
    dispatch(listActionCreators.loadLists(response.data));

    dispatch(ActionUtility.createAction(LOADING_END));
  };
};
