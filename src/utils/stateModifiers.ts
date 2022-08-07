import produce from "immer";
import {
  AppState,
  moveCardToListParams,
  moveListParams,
} from "../hooks/useBoardStore";
import CardType from "../types/CardType";
import ListType from "../types/ListType";
import { getById, insert, removeById } from "./arrayUtils";

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

const addListToBoard = (state: AppState, list: ListType) => {
  return produce(state, (draftState) => {
    draftState.lists.concat([list.id]);
    draftState.listsById[list.id] = list;
  });
};

const addCardToList = (state: AppState, listId: string, card: CardType) => {
  return produce(state, (draftState) => {
    draftState.listsById[listId].cards.push(card);
  });
};

const moveList = (state: AppState, params: moveListParams) => {
  return produce(state, (draftState) => {
    draftState.lists[params.fromIndex] = state.lists[params.toIndex];
    draftState.lists[params.toIndex] = state.lists[params.fromIndex];
  });
};

const moveCardToList = (state: AppState, params: moveCardToListParams) => {
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
  moveCardToList,
  setLists,
  resetBoard,
  setCardModal,
  resetCardModal,
};
