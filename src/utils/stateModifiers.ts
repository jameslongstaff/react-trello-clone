import produce from "immer";
import { AppState } from "../hooks/useBoardStore";
import BoardType from "../types/BoardType";
import CardType from "../types/CardType";
import ListType from "../types/ListType";
import { getById, insert, move, removeById } from "./arrayUtils";
import boardConfig from "../config/board.config";
import {
  MoveCardParamsType,
  MoveCardToListParamsType,
  MoveListParamsType
} from "../types/StoreTypes";

const initBoard = (state: AppState, board: BoardType) => {
  const listsById = board.lists.reduce((acc: { [key: string]: ListType }, curr: ListType) => {
    acc[curr.id] = curr;
    return acc;
  }, {});

  return produce(state, (draftState) => {
    draftState.board.title = board.title;
    draftState.lists = board.lists.map((list) => list.id);
    draftState.listsById = listsById;
  });
};

const resetBoard = () => {
  return boardConfig.initialBoardState;
};

const setLists = (listIds: string[]) => {
  return { lists: listIds };
};

const setList = (state: AppState, list: ListType): AppState => {
  return produce(state, (draftState) => {
    draftState.listsById[list.id] = list;
  });
};

const addListToBoard = (state: AppState, list: ListType) => {
  return produce(state, (draftState) => {
    draftState.lists = draftState.lists.concat([list.id]);
    draftState.listsById[list.id] = list;
  });
};

const addCardToBoard = (state: AppState, card: CardType): AppState => {
  return produce(state, (draftState) => {
    draftState.listsById[card.listId].cards.push(card);
  });
};

const updateCard = (state: AppState, card: CardType): AppState => {
  const cardIndex = state.listsById[card.listId].cards.findIndex(({ id }) => id === card.id);

  return produce(state, (draftState) => {
    draftState.listsById[card.listId].cards[cardIndex] = card;
  });
};

const removeListFromBoard = (state: AppState, listId: string): AppState => {
  return produce(state, (draftState) => {
    delete draftState.listsById[listId];
    draftState.lists = draftState.lists.filter((id) => id !== listId);
  });
};

const removeCardFromBoard = (state: AppState, card: CardType): AppState => {
  return produce(state, (draftState) => {
    draftState.listsById[card.listId].cards = draftState.listsById[card.listId].cards.filter(
      ({ id }) => id !== card.id
    );
  });
};

const moveList = (state: AppState, params: MoveListParamsType): AppState => {
  return produce(state, (draftState) => {
    draftState.lists[params.fromIndex] = state.lists[params.toIndex];
    draftState.lists[params.toIndex] = state.lists[params.fromIndex];
  });
};

const moveCardToList = (state: AppState, params: MoveCardToListParamsType): AppState => {
  const { cardId, pos, fromList, toList } = params;

  const fromCard = getById<CardType>(fromList.cards, cardId);

  if (fromCard) {
    return produce(state, (draftState) => {
      draftState.listsById[fromList.id].cards = removeById<CardType>(
        state.listsById[fromList.id].cards,
        cardId
      );

      draftState.listsById[toList.id].cards = insert<CardType>(
        state.listsById[toList.id].cards,
        fromCard,
        pos
      );
    });
  }

  return state;
};

const moveCard = (state: AppState, params: MoveCardParamsType): AppState => {
  const { cardId, pos, list } = params;

  const oldIndex = list.cards.findIndex((card) => card.id === cardId);

  return produce(state, (draftState) => {
    const cards = move(params.list.cards, oldIndex, pos);

    draftState.listsById[list.id].cards = cards;
  });
};

const setCardModal = (state: AppState, card: CardType): AppState => {
  return produce(state, (draftState) => {
    draftState.cardModal = {
      show: true,
      card
    };
  });
};

const resetCardModal = (state: AppState): AppState => {
  return produce(state, (draftState) => {
    draftState.cardModal = {
      show: true,
      card: undefined
    };
  });
};

export default {
  initBoard,
  moveList,
  addListToBoard,
  addCardToBoard,
  removeCardFromBoard,
  removeListFromBoard,
  moveCardToList,
  setLists,
  setList,
  resetBoard,
  setCardModal,
  resetCardModal,
  moveCard,
  updateCard
};
