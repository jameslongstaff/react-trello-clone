import * as actions from "../actions/board";

export type boardReduxState = {
  readonly byId: {};
  readonly activeBoardId: string;
  readonly modalState: {};
};

const initialState: any = {
  test: "test",
  byId: {
    2: {
      id: 2,
      title: "The is another long board title"
    }
  },
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
        taskModalId: payload.taskId
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
      byId: {
        ...state.byId,
        [boardId]: {
          id: boardId,
          title: title
        }
      }
    };
  }

  if (action.type === actions.FETCH_BOARD_SUCCESS) {
    const { id, title } = payload;

    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: {
          id,
          title
        }
      },
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

export default reducer;
