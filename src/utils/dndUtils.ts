import { Active, Over } from "@dnd-kit/core";
import CardType from "../types/CardType";
import { ListsByIdType } from "../types/StoreTypes";

const findContainer = (id: string, listsById: ListsByIdType): string | undefined => {
  if (id in listsById) {
    return id;
  }

  return findContainerForCard(id, listsById);
};

const findContainerForCard = (id: string, listsById: ListsByIdType): string | undefined => {
  return Object.keys(listsById).find((listId) => {
    return listsById[listId].cards.find((card: CardType) => card.id === id);
  });
};

const findCardById = (id: string, listsById: ListsByIdType): CardType | undefined => {
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

const getCardIndex = (cardId: string, listsById: ListsByIdType): number => {
  const listId = findContainer(cardId, listsById);

  if (!listId) {
    return -1;
  }

  return listsById[listId].cards.findIndex((card: CardType) => card.id === cardId);
};

const getNewIndex = (overListCardIndex: number, over: Over, active: Active): number => {
  const modifier = isBelowOverItem(over, active) ? 1 : 0;
  return overListCardIndex + modifier;
};

const isBelowOverItem = (over: Over, active: Active): boolean => {
  return !!(
    over &&
    active.rect.current.translated &&
    active.rect.current.translated?.top > over.rect.top + over.rect.height
  );
};

export {
  findCardById,
  findContainer,
  findContainerForCard,
  getCardIndex,
  getNewIndex,
  getNextContainerId
};
