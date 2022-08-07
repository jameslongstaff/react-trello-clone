import { ListsByIdType } from "../hooks/useBoardStore";
import CardType from "../types/CardType";
import ListType from "../types/ListType";

const findContainer = (id: string, listsById: ListsByIdType) => {
  if (id in listsById) {
    return id;
  }

  return findContainerForCard(id, listsById);
};

const findContainerForCard = (id: string, listsById: ListsByIdType) => {
  return Object.keys(listsById).find((listId) => {
    return listsById[listId].cards.find((card: CardType) => card.id === id);
  });
};

const findCardById = (id: string, listsById: ListsByIdType) => {
  return Object.keys(listsById)
    .map((listId) => listsById[listId].cards)
    .flat()
    .find((card) => card.id === id);
};

const getNextContainerId = (listsById: ListsByIdType) => {
  const listIds = Object.keys(listsById);
  const lastContainerId = listIds[listIds.length - 1];

  return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
};

const getCardIndex = (cardId: string, listsById: ListsByIdType) => {
  const listId = findContainer(cardId, listsById);

  if (!listId) {
    return -1;
  }

  return listsById[listId].cards.findIndex(
    (card: CardType) => card.id === cardId
  );
};

const getNewIndex = (overListCardIndex: number, over: any, active: any) => {
  const modifier = isBelowOverItem(over, active) ? 1 : 0;
  return overListCardIndex + modifier;
};

const isBelowOverItem = (over: any, active: any) => {
  return (
    over &&
    active.rect.current.translated &&
    active.rect.current.translated?.top > over.rect.top + over.rect.height
  );
};

const removeCardFromList = (list: ListType, cardId: string): ListType => {
  const cards = list.cards.filter((card) => card.id !== cardId);
  return { ...list, cards };
};

const addCardToList = (
  cardId: string,
  fromList: ListType,
  toList: ListType,
  index: number
): ListType => {
  const newList: ListType = structuredClone(toList);
  const fromCard = fromList.cards.find((card) => card.id === cardId)!;
  newList.cards.splice(index, 0, fromCard);
  return newList;
};

export {
  findCardById,
  findContainer,
  findContainerForCard,
  getCardIndex,
  getNewIndex,
  removeCardFromList,
  addCardToList,
  getNextContainerId,
};
