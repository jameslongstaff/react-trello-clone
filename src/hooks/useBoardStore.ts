import create from "zustand";
import ListType from "../types/ListType";
import CardType from "../types/CardType";
import stateModifiers from "../utils/stateModifiers";
import BoardType from "../types/BoardType";
import config from "../config/board.config";
import {
  BoardStateType,
  CardModalStateType,
  ListsByIdType,
  MoveCardParamsType,
  MoveCardToListParamsType,
  MoveListParamsType,
  ZustandSetFnType
} from "../types/StoreTypes";

export interface AppState {
  board: BoardStateType;
  setBoard: (board: BoardStateType) => void;
  initBoard: (board: BoardType) => void;

  cardModal: CardModalStateType;
  setCardModal: (card: CardType) => void;
  resetCardModal: () => void;

  lists: string[];
  listsById: ListsByIdType;
  setListsById: (listsById: ListsByIdType) => void;
  setLists: (listIds: string[]) => void;
  setList: (listType: ListType) => void;
  moveList: (params: MoveListParamsType) => void;

  addListToBoard: (list: ListType) => void;
  removeListFromBoard: (listId: string) => void;
  removeCardFromBoard: (card: CardType) => void;

  addCardToBoard: (card: CardType) => void;
  moveCardToList: (params: MoveCardToListParamsType) => void;
  moveCard: (params: MoveCardParamsType) => void;
  updateCard: (card: CardType) => void;
}

const cardActions = (set: ZustandSetFnType) => {
  return {
    addCardToBoard: (card: CardType) =>
      set((state: AppState) => stateModifiers.addCardToBoard(state, card)),

    removeCardFromBoard: (card: CardType) =>
      set((state: AppState) => stateModifiers.removeCardFromBoard(state, card)),

    moveCardToList: (params: MoveCardToListParamsType) =>
      set((state: AppState) => stateModifiers.moveCardToList(state, params)),

    moveCard: (params: MoveCardParamsType) =>
      set((state: AppState) => stateModifiers.moveCard(state, params)),

    updateCard: (card: CardType) => set((state: AppState) => stateModifiers.updateCard(state, card))
  };
};

const listActions = (set: ZustandSetFnType) => {
  return {
    setLists: (listIds: string[]) => set(() => stateModifiers.setLists(listIds)),

    setList: (list: ListType) => set((state: AppState) => stateModifiers.setList(state, list)),

    moveList: (params: MoveListParamsType) =>
      set((state: AppState) => stateModifiers.moveList(state, params)),

    addListToBoard: (list: ListType) =>
      set((state: AppState) => stateModifiers.addListToBoard(state, list)),

    removeListFromBoard: (listId: string) =>
      set((state: AppState) => stateModifiers.removeListFromBoard(state, listId)),

    setListsById: (listsById: ListsByIdType) =>
      set({
        listsById
      })
  };
};

const boardActions = (set: ZustandSetFnType) => {
  return {
    setBoard: (board: BoardStateType) => set({ board }),

    initBoard: (board: BoardType) =>
      set((state: AppState) => stateModifiers.initBoard(state, board))
  };
};

const modalActions = (set: ZustandSetFnType) => {
  return {
    setCardModal: (card: CardType) =>
      set((state: AppState) => stateModifiers.setCardModal(state, card)),

    resetCardModal: () => set((state: AppState) => stateModifiers.resetCardModal(state))
  };
};

const useBoardStore = create<AppState>()((set) => ({
  ...config.initialBoardState,
  ...cardActions(set),
  ...listActions(set),
  ...boardActions(set),
  ...modalActions(set)
}));

export default useBoardStore;
