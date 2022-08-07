import create from "zustand";
import ListType from "../types/ListType";
import CardType from "../types/CardType";
import stateModifiers from "../utils/stateModifiers";

export type ListsByIdType = {
  [listId: string]: ListType;
};

interface CardModalState {
  show: boolean;
  card?: CardType;
}

interface BoardState {
  title: string;
}

export type moveCardToListParams = {
  cardId: string;
  fromList: ListType;
  toList: ListType;
  pos: number;
};

export type moveListParams = {
  fromList: ListType;
  toList: ListType;
  fromIndex: number;
  toIndex: number;
};

export interface AppState {
  board: BoardState;
  setBoard: (board: BoardState) => void;
  resetBoard: () => void;

  cardModal: CardModalState;
  setCardModal: (card: CardType) => void;
  resetCardModal: () => void;

  lists: string[];
  listsById: ListsByIdType;

  setLists: (listIds: string[]) => void;
  addListToBoard: (list: ListType) => void;
  removeListFromBoard: (list: ListType) => void;
  addCardToList: (listId: string, card: CardType) => void;
  moveCardToList: (params: moveCardToListParams) => void;
  moveList: (params: moveListParams) => void;
  setListsById: (listsById: ListsByIdType) => void;
}

// TODO move state modifiers to helper -> stateModfiers.ts
const useBoardStore = create<AppState>()((set) => ({
  board: {
    title: "",
  },
  cardModal: {
    show: false,
    card: undefined,
  },
  lists: [],
  listsById: {},

  setBoard: (board: BoardState) => set({ board }),

  resetBoard: () => set(() => stateModifiers.resetBoard()),

  setCardModal: (card: CardType) =>
    set(() => stateModifiers.setCardModal(card)),

  resetCardModal: () => set(() => stateModifiers.resetCardModal()),

  setLists: (listIds: string[]) => set(() => stateModifiers.setLists(listIds)),

  moveList: (params: moveListParams) =>
    set((state: AppState) => stateModifiers.moveList(state, params)),

  addListToBoard: (list: ListType) =>
    set((state: AppState) => stateModifiers.addListToBoard(state, list)),

  removeListFromBoard: (list: ListType) => set((state: AppState) => state),

  addCardToList: (listId: string, card: CardType) =>
    set((state: AppState) => stateModifiers.addCardToList(state, listId, card)),

  moveCardToList: (params: moveCardToListParams) =>
    set((state: AppState) => stateModifiers.moveCardToList(state, params)),

  setListsById: (listsById: ListsByIdType) =>
    set({
      listsById,
    }),
}));

export default useBoardStore;
