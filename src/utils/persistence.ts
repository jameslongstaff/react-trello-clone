import BoardType from "../types/BoardType";
import ListType from "../types/ListType";
import { v4 as uuidv4 } from "uuid";
import CardType from "../types/CardType";

const setBoard = (board: BoardType): void => {
  localStorage.setItem("board", JSON.stringify(board));
};

const getBoard = (): BoardType => {
  if (!localStorage.getItem("board")) {
    const board = { lists: [], title: "Board title" };
    localStorage.setItem("board", JSON.stringify(board));
    return board;
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

const addCardToList = (listId: string, title: string): BoardType => {
  const newCard: CardType = {
    id: uuidv4(),
    title,
    content: "",
  };

  const board = JSON.parse(localStorage.getItem("board")!);

  board.lists.find((list: ListType) => (list.id = listId)).cards.push(newCard);

  localStorage.setItem("board", JSON.stringify(board));

  return board;
};

export { getBoard, addListToBoard, setBoard, addCardToList };
