import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import BoardType from "../types/BoardType";
import CardType from "../types/CardType";

interface CardModalState {
  show: boolean;
  card?: CardType;
}

interface BoardState {
  board: BoardType;
  cardModal: CardModalState;
  setBoard: (board: BoardType) => void;
  resetBoard: () => void;
  setCardModal: (card: CardType) => void;
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
        card: undefined,
      },
      setBoard: (board) => set({ board }),
      resetBoard: () =>
        set({
          board: {
            title: "New title",
            lists: [],
          },
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
    }))
  )
);

export default useBoardStore;
