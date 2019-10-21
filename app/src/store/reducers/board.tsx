import * as actions from "../actions/board";

const initialState: any = {
  test: "test",
  byId: {
    1: {
      id: 1,
      title: "Test board"
    },
    2: {
      id: 2,
      title: "The is another long board title"
    }
  },
  activeBoardId: 1,
  modalState: {
    taskModalIsVisible: false,
    taskModalId: null
  }
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
          ...state.byId[boardId],
          title: title
        }
      }
    };
  }

  return state;
};

export default reducer;
