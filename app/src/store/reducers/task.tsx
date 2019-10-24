import cuid from "cuid";
import * as actions from "../actions/task";

const initialState: any = {
  byId: {
    1: {
      id: "1",
      boardID: "1",
      title: "This is the first card"
    },
    2: {
      id: "2",
      boardID: "1",
      title:
        "This is the second card. Adding a slightly larger title for testing purposes. Even longer now."
    },
    3: {
      id: "3",
      boardID: "1",
      title: "This is the second card"
    },
    4: {
      id: "4",
      boardID: "1",
      title: "This is the second card"
    }
  }
};

const reducer = (state = initialState, action: any) => {
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

  return state;
};

export default reducer;
