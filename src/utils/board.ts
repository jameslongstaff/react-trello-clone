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

export { addCardToList };
