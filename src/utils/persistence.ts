import BoardType from "../types/BoardType";
import ListType from "../types/ListType";
import { v4 as uuidv4 } from "uuid";

const setBoard = (board: BoardType): void => {
  localStorage.setItem("board", JSON.stringify(board));
};

const getBoard = (): BoardType => {
  if (!localStorage.getItem("board")) {
    localStorage.setItem("board", JSON.stringify({ lists: [] }));
  }

  return JSON.parse(localStorage.getItem("board")!);
};

const addListToBoard = (title: string): BoardType => {
  const newList: ListType = {
    id: uuidv4(),
    title,
    cards: [],
  };

  const board = JSON.parse(localStorage.getItem("board")!);

  board.lists = board.lists.concat([newList]);

  localStorage.setItem("board", JSON.stringify(board));

  return board;
};

export { getBoard, addListToBoard, setBoard };
