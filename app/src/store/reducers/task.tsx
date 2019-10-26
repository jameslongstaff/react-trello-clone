import cuid from "cuid";
import * as actions from "../actions/task";

const initialState: any = {
  byId: {},
  loading: false
};

const reducer = (state = initialState, action: any) => {
  const { payload } = action;

  if (action.type === actions.CLONE_TASK) {
    const tempTaskId = cuid();

    const { taskId } = action.payload;

    const lists = {
      ...state,
      byId: {
        ...state.byId,
        [tempTaskId]: {
          ...state.byId[taskId],
          id: tempTaskId
        }
      }
    };

    return lists;
  }

  if (action.type === actions.UPDATE_TASK_CONTENT) {
    const { content, taskId } = action.payload;

    const cards = {
      ...state,
      byId: {
        ...state.byId,
        [action.payload.taskId]: {
          ...state.byId[taskId],
          content: content
        }
      }
    };

    return cards;
  }

  if (action.type === actions.UPDATE_TASK_TITLE) {
    const { title, taskId } = action.payload;

    const tasks = {
      ...state,
      byId: {
        ...state.byId,
        [taskId]: {
          ...state.byId[taskId],
          title: title
        }
      }
    };

    return tasks;
  }

  if (action.type === actions.DELETE_TASK) {
    const { taskId } = action.payload;

    let tasks = { ...state };
    delete tasks.byId[taskId];

    return tasks;
  }

  if (action.type === actions.CREATE_TASK) {
    const { title, taskId } = action.payload;

    const tasks = {
      ...state,
      byId: {
        ...state.byId,
        [taskId]: {
          title: title,
          id: taskId
        }
      }
    };

    return tasks;
  }

  if (action.type === actions.FETCH_CARDS_SUCCESS) {
    const { cards } = payload;

    const newState = {
      ...state,
      byId: {
        ...state.byId
      },
      loading: false
    };

    cards.forEach((card: any) => {
      newState.byId[card._id] = {
        id: card._id,
        title: card.title
      };
    });

    return newState;
  }

  if (action.type === actions.FETCH_CARDS_BEGIN) {
    return {
      ...state,
      loading: true
    };
  }

  return state;
};

export default reducer;
