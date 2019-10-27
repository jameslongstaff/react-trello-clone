import * as boardActions from "../actions/board";

import * as boardActionCreators from "../actionCreators/board";
import * as listActionCreators from "../actionCreators/list";
import * as cardActionCreators from "../actionCreators/card";

import axios from "axios";

export const showTaskModal = (payload: any) => {
  return { type: boardActions.SHOW_TASK_MODAL, payload };
};

export const hideTaskModal = () => {
  return { type: boardActions.HIDE_TASK_MODAL };
};

export const createBoard = (payload: any) => {
  return { type: boardActions.CREATE_BOARD, payload };
};

export const deleteBoard = (payload: any) => {
  return { type: boardActions.DELETE_BOARD, payload };
};

export const updateBoardTitle = (payload: any) => {
  return { type: boardActions.UPDATE_BOARD_TITLE, payload };
};

export const loadBoard = (payload: any) => {
  return { type: boardActions.LOAD_BOARD, payload };
};

export const fetchBoardBegin = () => {
  return { type: boardActions.FETCH_BOARD_BEGIN };
};

export const fetchBoardSuccess = () => {
  return { type: boardActions.FETCH_BOARD_SUCCESS };
};

export const fetchBoardData = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(fetchBoardBegin());

    const { boardId } = payload;

    const apiUrl = `http://localhost:4000/api/board/${boardId}`;

    const response = await axios.get(apiUrl);

    dispatch(boardActionCreators.loadBoard(response.data));
    dispatch(cardActionCreators.loadCards(response.data));
    dispatch(listActionCreators.loadLists(response.data));

    dispatch(fetchBoardSuccess());
  };
};
