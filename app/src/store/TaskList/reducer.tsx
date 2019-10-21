import cuid from "cuid";
import * as actions from "./actions";

//https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao

const initialState: any = {
  byId: {
    "1": {
      id: "1",
      title: "Backlog",
      tasks: [1, 2, 3],
      contingency: 10
    },
    "2": {
      id: "2",
      title: "Sprint",
      tasks: [4],
      contingency: 2
    },
    "3": {
      id: "3",
      title: "Doing",
      tasks: []
    },
    "4": {
      id: "4",
      title: "Done",
      tasks: []
    }
  },
  allIds: ["1", "2", "3", "4"]
};

const reducer = (state = initialState, action: any) => {
  if (action.type === actions.CLONE_LIST) {
    const tempListId = cuid();
    const { listId } = action.payload;

    const lists = {
      ...state,
      byId: {
        ...state.byId,
        [tempListId]: {
          ...state.byId[listId],
          id: tempListId
        }
      }
    };

    return lists;
  }

  if (action.type === actions.CREATE_LIST_TASK) {
    const { taskListId, taskId } = action.payload;

    const lists = {
      ...state,
      byId: {
        ...state.byId,
        [taskListId]: {
          ...state.byId[taskListId],
          tasks: [...state.byId[taskListId].tasks, taskId]
        }
      }
    };

    return lists;
  }

  if (action.type === actions.CREATE_LIST) {
    const tempListId = cuid();
    const { boardId, title } = action.payload;

    if (title !== "") {
      const lists = {
        ...state,
        byId: {
          ...state.byId,
          [tempListId]: {
            title: title,
            id: tempListId,
            boardId: boardId
          }
        }
      };

      return lists;
    }
  }

  if (action.type === actions.DELETE_LIST) {
    const { listId } = action.payload;

    let lists = { ...state };
    delete lists.byId[listId];

    return lists;
  }

  if (action.type === actions.UPDATE_LIST_TITLE) {
    const { title, taskListId } = action.payload;

    const lists = {
      ...state,
      byId: {
        ...state.byId,
        [action.payload.taskListId]: {
          ...state.byId[taskListId],
          title: title
        }
      }
    };

    return lists;
  }

  if (action.type === actions.UPDATE_TASK_ORDER) {
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

  return state;
};

export const getListById = (state: any, id: string) => {
  state.find((list: any) => {
    return list.id === id;
  });
};

export default reducer;

//       const destinationCards = getCardsByListId(state, destinationId);

//       let cardToMove = sourceCards.splice(sourceIndex, 1)[0];

//       cardToMove.listId = destinationId;
//       sourceCards.slice(sourceIndex, 0);

//       destinationCards.push(cardToMove);

//       orderedDestinationCards = moveCard(
//         [...destinationCards],
//         destinationCards.length - 1,
//         destinationIndex
//       );
