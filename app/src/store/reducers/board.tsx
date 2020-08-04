import * as actions from "../actions/board";
import { Board } from "../../models/board";
import { Action } from "../types";

export interface ByIdHash {
  [id: string]: Board;
}

export interface BoardModalState {
  taskModalIsVisible: boolean;
  taskModalId: string | null,
}

export interface BoardState {
  board: Board;
  byId: any,
  modalState: BoardModalState,
  allIds: string[],
  loading: boolean,
  menuOpen: boolean,
}

const initialState: any = {
  board: { title: '', listId: null },
  byId: {},
  modalState: {
    taskModalIsVisible: false,
    taskModalId: null
  },
  allIds: [],
  loading: true,
  menuOpen: false,
};

const reducer = (state: any = initialState, action: Action) => {
  const { payload, type } = action;

  if (type === actions.TOGGLE_BOARD_MENU) {
    return {
      ...state,
      menuOpen: !state.menuOpen,
    };
  }

  if (type === actions.OPEN_BOARD_MENU) {
    return {
      ...state,
      menuOpen: true,
    };
  }

  if (type === actions.CLOSE_BOARD_MENU) {
    return {
      ...state,
      menuOpen: false,
    };
  }

  if (type === actions.SHOW_TASK_MODAL) {
    return {
      ...state,
      modalState: {
        ...state.modalState,
        taskModalIsVisible: true,
        taskModalId: payload.cardId
      }
    };
  }

  if (type === actions.HIDE_TASK_MODAL) {
    return {
      ...state,
      modalState: {
        ...state.modalState,
        taskModalIsVisible: false,
        taskModalId: false
      }
    };
  }

  if (type === actions.DELETE_BOARD) {
    const { boardId } = payload;

    let boards = {
      ...state,
      allIds: [...state.allIds.filter((b: any) => b !== boardId)],
    };

    delete boards.byId[boardId];

    return boards;
  }

  if (type === actions.UPDATE_BOARD_TITLE) {
    const { boardId, title } = payload;

    return {
      ...state,
      board: {
        id: boardId,
        title: title
      }
    };
  }

  if (type === actions.CREATE_BOARD) {

    return {
      ...state,
      byId: {
        ...state.byId,
        [payload.board.id]: payload.board,
      },
      allIds: [...state.allIds.concat([payload.id])]
    };
  }

  if (type === actions.LOAD_BOARDS) {
    const boards = payload.map((b: any) => {
      const { title, _id } = b;
      return {
        id: b._id,
        title,
      }
    })

    return {
      ...state,
      byId: arrayToObject(boards, 'id'),
      allIds: boards.map((b: any) => b.id),
    };
  }


  if (action.type === actions.LOAD_BOARD) {
    return {
      ...state,
      board: {
        ...state.board,
        title: payload.title
      }
    };
  }

  if (action.type === actions.FETCH_BOARD_SUCCESS) {
    return {
      ...state,
      loading: false
    };
  }

  if (action.type === actions.FETCH_BOARD_BEGIN) {
    return {
      ...state,
      loading: true
    };
  }

  if (action.type === actions.FETCH_BOARDS_SUCCESS) {
    return {
      ...state,
      loading: false
    };
  }

  if (action.type === actions.FETCH_BOARDS_BEGIN) {
    return {
      ...state,
      loading: true
    };
  }

  return state;
};

const arrayToObject = (array: [], param: string): ByIdHash =>
  array.reduce((obj: any, item: any) => {
    obj[item[param]] = item;
    return obj;
  }, {});

export default reducer;
