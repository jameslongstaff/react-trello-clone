import produce from "immer";
import {
  AppState,
  moveCardParams,
  moveCardToListParams,
  moveListParams,
} from "../hooks/useBoardStore";
import CardType from "../types/CardType";
import ListType from "../types/ListType";
import { getById, insert, move, removeById } from "./arrayUtils";

const resetBoard = () => {
  return {
    board: {
      title: "New title",
    },
    lists: [],
    listsById: {},
  };
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
    draftState.lists.concat([list.id]);
    draftState.listsById[list.id] = list;
  });
};

const addCardToList = (
  state: AppState,
  listId: string,
  card: CardType
): AppState => {
  return produce(state, (draftState) => {
    draftState.listsById[listId].cards.push(card);
  });
};

const updateCard = (state: AppState, card: CardType): AppState => {
  const cardIndex = state.listsById[card.listId].cards.findIndex(
    (c) => c.id === card.id
  );

  return produce(state, (draftState) => {
    draftState.listsById[card.listId].cards[cardIndex] = card;
  });
};

const removeListFromBoard = (state: AppState, listId: string): AppState => {
  return produce(state, (draftState) => {
    delete draftState.listsById[listId];
    draftState.lists.filter((id) => id !== listId);
  });
};

const removeCardFromList = (
  state: AppState,
  listId: string,
  cardId: string
): AppState => {
  return produce(state, (draftState) => {
    draftState.listsById[listId].cards.filter((card) => card.id !== cardId);
  });
};

const moveList = (state: AppState, params: moveListParams): AppState => {
  return produce(state, (draftState) => {
    draftState.lists[params.fromIndex] = state.lists[params.toIndex];
    draftState.lists[params.toIndex] = state.lists[params.fromIndex];
  });
};

const moveCardToList = (
  state: AppState,
  params: moveCardToListParams
): AppState => {
  const { cardId, pos, fromList, toList } = params;

  const fromCard = getById<CardType>(fromList.cards, cardId)!;

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
};

const moveCard = (state: AppState, params: moveCardParams): AppState => {
  const { cardId, pos, list } = params;

  const oldIndex = list.cards.findIndex((card) => card.id === cardId);

  return produce(state, (draftState) => {
    const cards = move(params.list.cards, oldIndex, pos);

    draftState.listsById[list.id].cards = cards;
  });
};

const setCardModal = (card: CardType) => {
  return {
    cardModal: {
      show: true,
      card,
    },
  };
};

const resetCardModal = () => {
  return {
    cardModal: {
      show: true,
      card: undefined,
    },
  };
};

export default {
  moveList,
  addListToBoard,
  addCardToList,
  removeCardFromList,
  removeListFromBoard,
  moveCardToList,
  setLists,
  setList,
  resetBoard,
  setCardModal,
  resetCardModal,
  moveCard,
  updateCard,
};
