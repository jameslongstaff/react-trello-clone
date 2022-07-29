import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import BoardType from "../types/BoardType";

interface CardModalState {
  show: boolean;
  cardId?: string;
}

interface BoardState {
  board: BoardType;
  cardModal: CardModalState;
  setBoard: (board: BoardType) => void;
  resetBoard: () => void;
  setCardModal: (cardId: string) => void;
  resetCardModal: () => void;
}

const useBoardStore = create<BoardState>()(
  devtools(
    persist((set) => ({
      board: {
        title: "",
        lists: [],
      },
      cardModal: {
        show: false,
        cardId: undefined,
      },
      setBoard: (board) => set({ board }),
      resetBoard: () =>
        set({
          board: {
            title: "New title",
            lists: [],
          },
        }),
      setCardModal: (cardId: string) =>
        set({
          cardModal: {
            show: true,
            cardId,
          },
        }),
      resetCardModal: () =>
        set({
          cardModal: {
            show: true,
            cardId: undefined,
          },
        }),
    }))
  )
);

export default useBoardStore;
