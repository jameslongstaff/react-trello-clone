import cuid from "cuid";

import * as listActions from "../actions/list";
import * as cardActions from "../actions/card";

//https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao

const initialState: any = {
  byId: {},
  loading: false
};

const reducer = (state = initialState, action: any) => {
  const { payload } = action;

  if (action.type === cardActions.UPDATE_TASK_ORDER) {
    const {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    } = action.payload;

    if (sourceId !== destinationId) {
      const sourceTasks = [...state.byId[sourceId].tasks];
      const destinationTasks = [...state.byId[destinationId].tasks];
      const task = sourceTasks.splice(sourceIndex, 1);
      destinationTasks.splice(destinationIndex, 0, task);

      return {
        ...state,
        byId: {
          ...state.byId,
          [destinationId]: {
            ...state.byId[destinationId],
            tasks: destinationTasks
          },
          [sourceId]: {
            ...state.byId[sourceId],
            tasks: sourceTasks
          }
        }
      };
    } else {
      const tasks = [...state.byId[sourceId].tasks];
      const [task] = tasks.splice(sourceIndex, 1);
      tasks.splice(destinationIndex, 0, task);

      return {
        ...state,
        byId: {
          ...state.byId,
          [destinationId]: {
            ...state.byId[destinationId],
            tasks: tasks
          }
        }
      };
    }
  }

  if (action.type === cardActions.CLONE_TASK) {
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

  if (action.type === cardActions.UPDATE_TASK_CONTENT) {
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

  if (action.type === cardActions.UPDATE_TASK_TITLE) {
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

  if (action.type === cardActions.DELETE_TASK) {
    const { taskId } = action.payload;

    let tasks = { ...state };
    delete tasks.byId[taskId];

    return tasks;
  }

  if (action.type === cardActions.CREATE_TASK) {
    const { listId, title, id } = action.payload;

    const tasks = {
      ...state,
      byId: {
        ...state.byId,
        [id]: {
          title: title,
          _id: id,
          listId
        }
      }
    };

    return tasks;
  }

  if (action.type === cardActions.LOAD_CARDS) {
    const { lists } = payload;
    const cards = lists.map((l: any) => l.cards).flat();

    const newState = {
      ...state,
      byId: arrayToObject(cards, "_id")
    };

    return newState;
  }

  if (action.type === cardActions.FETCH_CARDS_BEGIN) {
    return {
      ...state,
      loading: true
    };
  }

  return state;
};

export const getListById = (state: any, id: string) => {
  state.find((list: any) => {
    return list.id === id;
  });
};

const arrayToObject = (array: [], param: string) =>
  array.reduce((obj: any, item: any) => {
    obj[item[param]] = item;
    return obj;
  }, {});

export default reducer;
