import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import BoardType from "../types/BoardType";
import CardType from "../types/CardType";
import { addCardToList } from "../utils/board";

interface BoardState {
  board: BoardType;
  setBoard: (board: BoardType) => void;
  addCard: (listId: string, card: CardType) => void;
}

const useBoardStore = create<BoardState>()(
  devtools(
    persist((set) => ({
      board: {
        title: "",
        lists: [],
      },
      setBoard: (board) => set({ board }),
      addCard: (listId, card) =>
        set((state) => {
          return { board: addCardToList(state.board, listId, card) };
        }),
    }))
  )
);

export default useBoardStore;
