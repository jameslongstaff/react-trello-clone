import create from "zustand";
import ListType from "../types/ListType";
import CardType from "../types/CardType";

interface CardModalState {
  show: boolean;
  card?: CardType;
}

interface BoardState {
  title: string;
}

interface AppState {
  board: BoardState;
  setBoard: (board: BoardState) => void;
  resetBoard: () => void;

  cardModal: CardModalState;
  setCardModal: (card: CardType) => void;
  resetCardModal: () => void;

  lists: string[];
  setLists: (listIds: string[]) => void;
  addListToBoard: (list: ListType) => void;
  addCardToList: (listId: string, card: CardType) => void;

  listsById: { [listId: string]: ListType };
  setListsById: (lists: ListType[]) => void;
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
  setBoard: (board) => set({ board }),
  resetBoard: () =>
    set({
      board: {
        title: "New title",
      },
      lists: [],
      listsById: {},
    }),
  setCardModal: (card: CardType) =>
    set({
      cardModal: {
        show: true,
        card,
      },
    }),
  resetCardModal: () =>
    set({
      cardModal: {
        show: true,
        card: undefined,
      },
    }),
  setLists: (listIds: string[]) =>
    set({
      lists: listIds,
    }),
  addListToBoard: (list: ListType) =>
    set((state: AppState) => {
      return {
        lists: state.lists.concat(list.id),
        listsById: {
          ...state.listsById,
          [list.id]: list,
        },
      };
    }),
  addCardToList: (listId: string, card: CardType) =>
    set((state: AppState) => {
      return {
        listsById: {
          ...state.listsById,
          [listId]: {
            ...state.listsById[listId],
            cards: state.listsById[listId].cards.concat([card]),
          },
        },
      };
    }),
  setListsById: (lists: ListType[]) =>
    set({
      listsById: lists.reduce((acc: any, curr: any) => {
        acc[curr.id] = curr;
        return acc;
      }, {}),
    }),
}));

export default useBoardStore;
