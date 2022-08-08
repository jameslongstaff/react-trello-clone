import BoardType from "../types/BoardType";
import ListType from "../types/ListType";
import CardType from "../types/CardType";
import config from "../config/board.config";

const setBoard = (board: BoardType): void => {
  localStorage.setItem("board", JSON.stringify(board));
};

const getBoard = (): BoardType => {
  if (!localStorage.getItem("board")) {
    setBoard(config.initialLocalStorageBoard);
    return config.initialLocalStorageBoard;
  }

  return JSON.parse(String(localStorage.getItem("board")));
};

const addListToBoard = (list: ListType): void => {
  const board = getBoard();

  if (board) {
    board.lists = board.lists.concat([list]);
    setBoard(board);
  }
};

const addCardToBoard = (card: CardType): void => {
  const board = getBoard();

  if (board) {
    const list = board.lists.find((list: ListType) => list.id === card.listId);
    if (list) {
      list.cards.push(card);
    }
    setBoard(board);
  }
};

const deleteList = (listId: string): void => {
  const board = getBoard();

  if (board) {
    board.lists = board.lists.filter((list: ListType) => list.id !== listId);

    setBoard(board);
  }
};

const updateList = (update: ListType): void => {
  const board = getBoard();

  if (board) {
    const index = board.lists.findIndex((list: ListType) => list.id === update.id);

    board.lists[index] = update;

    setBoard(board);
  }
};

const deleteCard = (card: CardType): void => {
  const board = getBoard();

  if (board) {
    const listIndex = board.lists.findIndex((list: ListType) => list.id === card.listId);

    board.lists[listIndex].cards = board.lists[listIndex].cards.filter((c) => c.id !== card.id);

    setBoard(board);
  }
};

const updateCard = (update: CardType): void => {
  const board = getBoard();

  if (board) {
    const listIndex = board.lists.findIndex((list: ListType) => list.id === update.listId);

    const cardIndex = board.lists[listIndex].cards.findIndex((card) => card.id === update.id);

    board.lists[listIndex].cards[cardIndex] = update;

    setBoard(board);
  }
};

const moveList = (src: string, dest: string): void => {
  const board = getBoard();

  if (board) {
    const srcListIndex = board.lists.findIndex((list: ListType) => list.id === src);

    const destListIndex = board.lists.findIndex((list: ListType) => list.id === dest);

    const destListClone = structuredClone(board.lists[destListIndex]);

    board.lists[destListIndex] = board.lists[srcListIndex];
    board.lists[srcListIndex] = destListClone;

    setBoard(board);
  }
};

export {
  getBoard,
  addListToBoard,
  setBoard,
  addCardToBoard,
  updateList,
  updateCard,
  deleteList,
  deleteCard,
  moveList
};
