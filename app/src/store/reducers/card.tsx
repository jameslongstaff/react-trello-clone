import cuid from "cuid";

import * as cardActions from "../actions/card";

//https://dev.to/markusclaus/fetching-data-from-an-api-using-reactredux-55ao

const initialState: any = {
  byId: {},
  loading: false
};

const reducer = (state = initialState, action: any) => {
  const { payload } = action;

  if (action.type === cardActions.CLONE_TASK) {
    const tempTaskId = cuid();

    const { taskId } = payload;

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
    const { content, taskId } = payload;

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

  if (action.type === cardActions.UPDATE_CARD) {
    const { title, cardId } = payload;

    const tasks = {
      ...state,
      byId: {
        ...state.byId,
        [cardId]: {
          ...state.byId[cardId],
          title: title
        }
      }
    };

    return tasks;
  }

  if (action.type === cardActions.DELETE_LIST_CARDS) {
    const { listId } = payload;

    const cardsById = { ...state.byId }

    Object.keys({ ...state.byId }).filter(
      id => state.byId[id].listId === listId
    ).forEach(c => {
      delete cardsById[c];
    });

    return {
      ...state,
      byId: {
        ...state.byId,
        cardsById
      }
    };
  }

  if (action.type === cardActions.DELETE_CARD) {
    const { cardId } = payload;

    let cards = { ...state };
    delete cards.byId[cardId];

    return cards;
  }

  if (action.type === cardActions.CREATE_TASK) {
    const { listId, title, id } = payload;

    return {
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
