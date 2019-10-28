import cuid from "cuid";

import * as listActions from "../actions/list";
import * as cardActions from "../actions/card";

//https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao

const initialState: any = {
  byId: {},
  allIds: [],
  loading: false
};

const reducer = (state = initialState, action: any) => {
  const { payload } = action;

  if (action.type === listActions.CLONE_LIST) {
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

  if (action.type === listActions.CREATE_LIST_TASK) {
    const { taskListId, taskId } = action.payload;

    const lists = {
      ...state,
      byId: {
        ...state.byId,
        [taskListId]: {
          ...state.byId[taskListId],
          tasks: [...state.byId[taskListId].tasks, taskId]
        }
      },
    };

    return lists;
  }

  if (action.type === listActions.CREATE_LIST) {
    const { boardId, title, id } = action.payload;

    if (title !== "") {
      const lists = {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...action.payload,
            cards: []
          }
        },
        allIds: [...state.allIds, id]
      };

      return lists;
    }
  }

  if (action.type === listActions.DELETE_LIST) {
    const { listId } = action.payload;

    let lists = { ...state };
    delete lists.byId[listId];

    return lists;
  }

  if (action.type === listActions.UPDATE_LIST_TITLE) {
    const { title, listId } = action.payload;

    const lists = {
      ...state,
      byId: {
        ...state.byId,
        [action.payload.listId]: {
          ...state.byId[listId],
          title: title
        }
      }
    };

    return lists;
  }

  if (action.type === listActions.CLEAR_LIST) {
    const { id, listId } = payload;

    const s = {
      ...state,
      byId: {
        ...state.byId,
        [listId]: {
          ...state.byId[listId],
          cards: [...state.byId[listId].cards, id]
        }
      }
    };

    return s;
  }

  if (action.type === listActions.ADD_CARD_TO_LIST) {
    const { id, listId } = payload;

    const state1 = {
      ...state,
      byId: {
        ...state.byId,
        [listId]: {
          ...state.byId[listId],
          cards: [...state.byId[listId].cards.concat([id])]
        }
      }
    };

    return state1;
  }

  if (action.type === listActions.LOAD_LISTS) {
    let lists = payload.lists.map((l: any) => {
      return { ...l, cards: l.cards.map((c: any) => c._id) };
    });

    return {
      ...state,
      byId: arrayToObject(lists),
      allIds: [...lists.map((l: any) => l._id)]
    };
  }

  return state;
};

export const getListById = (state: any, id: string) => {
  state.find((list: any) => {
    return list.id === id;
  });
};

const arrayToObject = (array: []) =>
  array.reduce((obj: any, item: any) => {
    obj[item._id] = item;
    return obj;
  }, {});

export default reducer;
