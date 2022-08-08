import { AppState } from "../hooks/useBoardStore";
import CardType from "../types/CardType";

export const getCardsByListId = (store: AppState, listId: string): CardType[] => {
  return store.listsById[listId].cards;
};
