import BoardType from "../types/BoardType";
import CardType from "../types/CardType";
import ListType from "../types/ListType";

const addCardToList = (
  board: BoardType,
  listId: string,
  card: CardType
): BoardType => {
  const clonedBoard = structuredClone(board);

  const listIndex = clonedBoard.lists.findIndex(
    (list: ListType) => list.id === listId
  );

  clonedBoard.lists[listIndex].cards.push(card);

  return clonedBoard;
};

const setBoardTitle = (board: BoardType, title: string): BoardType => {
  const clonedBoard = structuredClone(board);

  clonedBoard.title = title;

  return clonedBoard;
};

const updateList = (board: BoardType, update: ListType): BoardType => {
  const clonedBoard = structuredClone(board);

  const index = clonedBoard.lists.findIndex(
    (list: ListType) => list.id === update.id
  );

  clonedBoard.lists[index] = update;

  return clonedBoard;
};

export { addCardToList, setBoardTitle };
