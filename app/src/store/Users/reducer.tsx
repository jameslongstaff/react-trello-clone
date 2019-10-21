import cuid from "cuid";
import * as actions from "./actions";

const initialState: any = {
  byId: {
    1: {
      id: "1",
      boardID: "1",
      title: "This is the first card",
      deadline: null,
      estimatedPoints: null,
      consumedPoints: null,
      taskListId: "1"
    },
    2: {
      id: "2",
      boardID: "1",
      title:
        "This is the second card. Adding a slightly larger title for testing purposes. Even longer now.",
      deadline: null,
      estimatedPoints: null,
      consumedPoints: null,
      taskListId: "1"
    },
    3: {
      id: "3",
      boardID: "1",
      title: "This is the second card",
      deadline: null,
      estimatedPoints: null,
      consumedPoints: null,
      taskListId: "1"
    },
    4: {
      id: "4",
      boardID: "1",
      title: "This is the second card",
      deadline: null,
      estimatedPoints: null,
      consumedPoints: null,
      taskListId: "1"
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

    const cards = {
      ...state,
      byId: {
        ...state.byId,
        [action.payload.taskId]: {
          ...state.byId[taskId],
          title: title
        }
      }
    };

    return cards;
  }

  if (action.type === actions.DELETE_TASK) {
    const { taskId } = action.payload;

    let tasks = { ...state };
    delete tasks.byId[taskId];

    return tasks;
  }

  if (action.type === actions.CREATE_TASK) {
    const tempTaskId = cuid();

    const cards = {
      ...state,
      byId: {
        ...state.byId,
        [tempTaskId]: {
          title: action.payload.title,
          taskListId: action.payload.taskListId,
          id: tempTaskId
        }
      }
    };

    return cards;
  }

  if (action.type === actions.UPDATE_TASK_ORDER) {
    //add to a sorter utility
    const {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    } = action.payload;

    const sourceCards = getCardsByListId(state, sourceId);

    let orderedSourceCards = sourceCards;
    let orderedDestinationCards = [];

    //if moving across lists
    if (sourceId !== destinationId) {
      const destinationCards = getCardsByListId(state, destinationId);

      let cardToMove = sourceCards.splice(sourceIndex, 1)[0];

      cardToMove.listId = destinationId;
      sourceCards.slice(sourceIndex, 0);

      destinationCards.push(cardToMove);

      orderedDestinationCards = moveCard(
        [...destinationCards],
        destinationCards.length - 1,
        destinationIndex
      );
    } else {
      orderedSourceCards = moveCard(
        [...sourceCards],
        sourceIndex,
        destinationIndex
      );
    }

    //getReorderedCards

    //combine list and card reducers

    let transformedSourceCards = getReorderedCards(state, orderedSourceCards);
    let transformedDestinationCards = {};

    if (sourceId !== destinationId) {
      transformedSourceCards = getReorderedCards(state, sourceCards);
      transformedDestinationCards = getReorderedCards(
        state,
        orderedDestinationCards
      );
    }

    return {
      ...state,
      byId: Object.assign(
        {},
        { ...state.byId },
        Object.assign({}, transformedSourceCards, transformedDestinationCards)
      )
    };
  }

  return state;
};

const getReorderedCards = (state: any, cards: any[]) => {
  const reorderedCards: any = [];

  cards.forEach((k, v) => {
    if (k !== undefined) {
      reorderedCards[k.id] = state.byId[k.id];
      reorderedCards[k.id].order = v + 1;
    }
  });

  return reorderedCards;
};

const moveCard = (arr: any[], old_index: number, new_index: number) => {
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    var k = new_index - arr.length;
    while (k-- + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

const getCardsByListId = (state: any, listId: any) => {
  const cards = Object.keys({ ...state.byId })
    .map(cardId => {
      return state.byId[cardId];
    })
    .filter(card => {
      return card.listId == listId;
    })
    .sort(function(a, b) {
      return a.order - b.order;
    });

  return cards;
};

export default reducer;
