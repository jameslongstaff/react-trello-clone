import * as listActions from "../actions/list";

const initialState: any = {
  byId: {},
  allIds: [],
  loading: false
};

const reducer = (state = initialState, action: any) => {
  const { payload } = action;

  if (action.type === listActions.CREATE_CLONED_LIST) {
    const { title, _id, cards } = action.payload;

    const newList = {
      id: _id,
      title,
      cards: cards.map((c: any) => c._id)
    }

    const list = {
      ...state,
      byId: {
        ...state.byId,
        [_id]: newList
      },
      allIds: [...state.allIds, _id]
    };

    return list;
  }

  if (action.type === listActions.CREATE_LIST) {
    const { title, id } = action.payload;

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

    let lists = {
      ...state,
      allIds: [...state.allIds].filter(id => id !== listId),
    };

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

  if (action.type === listActions.REMOVE_CARD_FROM_LIST) {
    const { cardId, listId } = payload;

    return {
      ...state,
      byId: {
        ...state.byId,
        [listId]: {
          ...state.byId[listId],
          cards: [...state.byId[listId].cards.filter((c: string) => c !== cardId)],
        }
      }
    }
  }

  if (action.type === listActions.ADD_CARD_TO_LIST) {
    const { id, listId } = payload;

    return {
      ...state,
      byId: {
        ...state.byId,
        [listId]: {
          ...state.byId[listId],
          cards: [...state.byId[listId].cards.concat([id])]
        }
      }
    };
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

  if (action.type === listActions.UPDATE_LIST_ORDER) {
    const {
      sourceIndex,
      destinationIndex
    } = payload;

    const lists = [...state.allIds];

    const [list] = lists.splice(sourceIndex, 1);
    lists.splice(destinationIndex, 0, list);

    return {
      ...state,
      allIds: lists,
    };
  }


  if (action.type === listActions.UPDATE_CARD_ORDER) {
    const {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    } = payload;

    if (sourceId !== destinationId) {
      const sourceCards = [...state.byId[sourceId].cards];
      const destinationCards = [...state.byId[destinationId].cards];
      const card = sourceCards.splice(sourceIndex, 1);
      destinationCards.splice(destinationIndex, 0, card);

      return {
        ...state,
        byId: {
          ...state.byId,
          [destinationId]: {
            ...state.byId[destinationId],
            cards: destinationCards
          },
          [sourceId]: {
            ...state.byId[sourceId],
            cards: sourceCards
          }
        }
      };
    } else {
      const cards = [...state.byId[sourceId].cards];
      const [card] = cards.splice(sourceIndex, 1);
      cards.splice(destinationIndex, 0, card);

      return {
        ...state,
        byId: {
          ...state.byId,
          [destinationId]: {
            ...state.byId[destinationId],
            cards: cards
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

const arrayToObject = (array: []) =>
  array.reduce((obj: any, item: any) => {
    obj[item._id] = item;
    return obj;
  }, {});

export default reducer;
