import * as actions from "../actions/board";

export type boardReduxState = {
  readonly byId: {};
  readonly activeBoardId: string;
  readonly modalState: {};
};

const initialState: any = {
  test: "test",
  board: {},
  byId: {},
  activeBoardId: 1,
  modalState: {
    taskModalIsVisible: false,
    taskModalId: null
  },
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

    let boards = { ...state };
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

  if (action.type === actions.ADD_LIST_TO_BOARD) {
    // const { id, listId } = payload;

    // return {
    //   ...state,
    //   byId: {
    //     ...state.byId,
    //     [listId]: {
    //       ...state.byId[listId],
    //       cards: [...state.byId[listId].cards.concat([id])]
    //     }
    //   }
    // };
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

  return state;
};

const arrayToObject = (array: []) =>
  array.reduce((obj: any, item: any) => {
    obj[item._id] = item;
    return obj;
  }, {});

export default reducer;
