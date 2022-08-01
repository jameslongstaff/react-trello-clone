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

const addListToBoard = (title: string): ListType => {
  const newList: ListType = {
    id: uuidv4(),
    title,
    cards: [],
  };

  const board = getBoard();

  board.lists = board.lists.concat([newList]);

  setBoard(board);

  return newList;
};

const addCardToList = (listId: string, title: string): CardType => {
  const newCard: CardType = {
    id: uuidv4(),
    title,
    content: "",
    listId,
  };

  const board = getBoard();

  board.lists.find((list: ListType) => list.id === listId)!.cards.push(newCard);

  setBoard(board);

  return newCard;
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

const moveList = (src: string, dest: string): BoardType => {
  const board = getBoard();

  const srcListIndex = board.lists.findIndex(
    (list: ListType) => list.id === src
  );

  const destListIndex = board.lists.findIndex(
    (list: ListType) => list.id === dest
  );

  const destListClone = structuredClone(board.lists[destListIndex]);

  board.lists[destListIndex] = board.lists[srcListIndex];
  board.lists[srcListIndex] = destListClone;

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
  moveList,
};
