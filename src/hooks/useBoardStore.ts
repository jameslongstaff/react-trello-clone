import create from "zustand";
import ListType from "../types/ListType";
import CardType from "../types/CardType";
import stateModifiers from "../utils/stateModifiers";
import BoardType from "../types/BoardType";

export type ListsByIdType = {
  [listId: string]: ListType;
};

type CardModalState = {
  show: boolean;
  card?: CardType;
};

type BoardState = {
  title: string;
};

export type moveCardParams = {
  cardId: string;
  list: ListType;
  pos: number;
};

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
  initBoard: (board: BoardType) => void;
  resetBoard: () => void;

  cardModal: CardModalState;
  setCardModal: (card: CardType) => void;
  resetCardModal: () => void;

  lists: string[];
  listsById: ListsByIdType;
  setListsById: (listsById: ListsByIdType) => void;
  setLists: (listIds: string[]) => void;
  setList: (listType: ListType) => void;
  moveList: (params: moveListParams) => void;

  addListToBoard: (list: ListType) => void;
  removeListFromBoard: (listId: string) => void;

  addCardToList: (listId: string, card: CardType) => void;
  removeCardFromList: (listId: string, cardId: string) => void;
  moveCardToList: (params: moveCardToListParams) => void;
  moveCard: (params: moveCardParams) => void;
  updateCard: (card: CardType) => void;
}

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

  initBoard: (board: BoardType) =>
    set((state: AppState) => stateModifiers.initBoard(state, board)),

  resetBoard: () => set(stateModifiers.resetBoard()),

  setCardModal: (card: CardType) =>
    set(() => stateModifiers.setCardModal(card)),

  resetCardModal: () => set(() => stateModifiers.resetCardModal()),

  setLists: (listIds: string[]) => set(() => stateModifiers.setLists(listIds)),

  setList: (list: ListType) =>
    set((state: AppState) => stateModifiers.setList(state, list)),

  moveList: (params: moveListParams) =>
    set((state: AppState) => stateModifiers.moveList(state, params)),

  addListToBoard: (list: ListType) =>
    set((state: AppState) => stateModifiers.addListToBoard(state, list)),

  removeListFromBoard: (listId: string) =>
    set((state: AppState) => stateModifiers.removeListFromBoard(state, listId)),

  addCardToList: (listId: string, card: CardType) =>
    set((state: AppState) => stateModifiers.addCardToList(state, listId, card)),

  removeCardFromList: (listId: string, cardId: string) =>
    set((state: AppState) =>
      stateModifiers.removeCardFromList(state, listId, cardId)
    ),

  moveCardToList: (params: moveCardToListParams) =>
    set((state: AppState) => stateModifiers.moveCardToList(state, params)),

  moveCard: (params: moveCardParams) =>
    set((state: AppState) => stateModifiers.moveCard(state, params)),

  updateCard: (card: CardType) =>
    set((state: AppState) => stateModifiers.updateCard(state, card)),

  setListsById: (listsById: ListsByIdType) =>
    set({
      listsById,
    }),
}));

export default useBoardStore;
