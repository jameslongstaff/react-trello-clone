import * as actions from "../actions/board";

export type boardReduxState = {
  readonly byId: {};
  readonly activeBoardId: string;
  readonly modalState: {};
};

const initialState: any = {
  board: {},
  byId: {},
  modalState: {
    taskModalIsVisible: false,
    taskModalId: null
  },
  allIds: [],
  loading: true
};

const reducer = (state = initialState, action: any) => {
  const { payload } = action;

  if (action.type === actions.SHOW_TASK_MODAL) {
    return {
      ...state,
      modalState: {
        ...state.modalState,
        taskModalIsVisible: true,
        taskModalId: payload.cardId
      }
    };
  }

  if (action.type === actions.HIDE_TASK_MODAL) {
    return {
      ...state,
      modalState: {
        ...state.modalState,
        taskModalIsVisible: false,
        taskModalId: false
      }
    };
  }

  if (action.type === actions.DELETE_BOARD) {
    const { boardId } = payload;

    let boards = {
      ...state,
      allIds: [...state.allIds.filter((b: any) => b !== boardId)],
    };

    delete boards.byId[boardId];

    return boards;
  }

  if (action.type === actions.UPDATE_BOARD_TITLE) {
    const { boardId, title } = payload;

    return {
      ...state,
      board: {
        id: boardId,
        title: title
      }
    };
  }

  if (action.type === actions.CREATE_BOARD) {
    const { title, _id } = payload;
    const board = {
      id: _id,
      title,
    }

    return {
      ...state,
      byId: {
        ...state.byId,
        [board.id]: board,
      },
      allIds: [
        [...state.allIds.concat([board.id])]
      ],
    };
  }

  if (action.type === actions.LOAD_BOARDS) {
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

const arrayToObject = (array: [], param: string) =>
  array.reduce((obj: any, item: any) => {
    obj[item[param]] = item;
    return obj;
  }, {});

export default reducer;
