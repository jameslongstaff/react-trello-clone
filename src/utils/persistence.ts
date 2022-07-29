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
    listId,
  };

  const board = getBoard();

  board.lists.find((list: ListType) => list.id === listId)!.cards.push(newCard);

  setBoard(board);

  return board;
};

const deleteList = (listId: string): BoardType => {
  const board = getBoard();

  board.lists = board.lists.filter((list: ListType) => list.id !== listId);

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

const deleteCard = (card: CardType): BoardType => {
  const board = getBoard();

  const listIndex = board.lists.findIndex(
    (list: ListType) => list.id === card.listId
  );

  board.lists[listIndex].cards = board.lists[listIndex].cards.filter(
    (c) => c.id !== card.id
  );

  setBoard(board);

  return board;
};

const updateCard = (update: CardType): BoardType => {
  const board = getBoard();

  const listIndex = board.lists.findIndex(
    (list: ListType) => list.id === update.listId
  );

  const cardIndex = board.lists[listIndex].cards.findIndex(
    (card) => card.id === update.id
  );

  board.lists[listIndex].cards[cardIndex] = update;

  setBoard(board);

  return board;
};

export {
  getBoard,
  addListToBoard,
  setBoard,
  addCardToList,
  updateList,
  updateCard,
  deleteList,
  deleteCard,
};
