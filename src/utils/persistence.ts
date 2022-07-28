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

  const board = getBoard();

  board.lists = board.lists.concat([newList]);

  setBoard(board);

  return board;
};

const addCardToList = (listId: string, title: string): BoardType => {
  const newCard: CardType = {
    id: uuidv4(),
    title,
    content: "",
  };

  const board = getBoard();

  board.lists.find((list: ListType) => (list.id = listId))!.cards.push(newCard);

  setBoard(board);

  return board;
};

const updateList = (update: ListType): BoardType => {
  const board = getBoard();

  const index = board.lists.findIndex(
    (list: ListType) => list.id === update.id
  );

  board.lists[index] = update;

  setBoard(board);

  return board;
};

export { getBoard, addListToBoard, setBoard, addCardToList, updateList };