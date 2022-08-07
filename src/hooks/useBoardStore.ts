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
  MoveListParamsType
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

  addCardToList: (listId: string, card: CardType) => void;
  removeCardFromList: (listId: string, cardId: string) => void;
  moveCardToList: (params: MoveCardToListParamsType) => void;
  moveCard: (params: MoveCardParamsType) => void;
  updateCard: (card: CardType) => void;
}

const useBoardStore = create<AppState>()((set) => ({
  ...config.initialBoardState,

  setBoard: (board: BoardStateType) => set({ board }),

  initBoard: (board: BoardType) => set((state: AppState) => stateModifiers.initBoard(state, board)),

  setCardModal: (card: CardType) => set(() => stateModifiers.setCardModal(card)),

  resetCardModal: () => set(() => stateModifiers.resetCardModal()),

  setLists: (listIds: string[]) => set(() => stateModifiers.setLists(listIds)),

  setList: (list: ListType) => set((state: AppState) => stateModifiers.setList(state, list)),

  moveList: (params: MoveListParamsType) =>
    set((state: AppState) => stateModifiers.moveList(state, params)),

  addListToBoard: (list: ListType) =>
    set((state: AppState) => stateModifiers.addListToBoard(state, list)),

  removeListFromBoard: (listId: string) =>
    set((state: AppState) => stateModifiers.removeListFromBoard(state, listId)),

  addCardToList: (listId: string, card: CardType) =>
    set((state: AppState) => stateModifiers.addCardToList(state, listId, card)),

  removeCardFromList: (listId: string, cardId: string) =>
    set((state: AppState) => stateModifiers.removeCardFromList(state, listId, cardId)),

  moveCardToList: (params: MoveCardToListParamsType) =>
    set((state: AppState) => stateModifiers.moveCardToList(state, params)),

  moveCard: (params: MoveCardParamsType) =>
    set((state: AppState) => stateModifiers.moveCard(state, params)),

  updateCard: (card: CardType) => set((state: AppState) => stateModifiers.updateCard(state, card)),

  setListsById: (listsById: ListsByIdType) =>
    set({
      listsById
    })
}));

export default useBoardStore;
