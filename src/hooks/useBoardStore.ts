import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import BoardType from "../types/BoardType";
import CardType from "../types/CardType";
import ListType from "../types/ListType";
import { addCardToList } from "../utils/board";

interface BoardState {
  board: BoardType;
  setBoard: (board: BoardType) => void;
  addCard: (listId: string, card: CardType) => void;
  addList: (list: ListType) => void;
}

const useBoardStore = create<BoardState>()(
  devtools(
    persist((set) => ({
      board: {
        title: "",
        lists: [],
      },
      setBoard: (board) => set({ board }),
      addList: (list) =>
        set((state) => {
          state.board.lists.push(list);

          return { board: state.board };
        }),
      addCard: (listId, card) =>
        set((state) => {
          const listIndex = state.board.lists.findIndex(
            (list) => list.id === listId
          );

          state.board.lists[listIndex].cards.push(card);

          return { board: addCardToList(state.board, listId, card) };
        }),
    }))
  )
);

export default useBoardStore;
