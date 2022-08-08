import { AppState } from "../hooks/useBoardStore";
import CardType from "./CardType";
import ListType from "./ListType";

export type ZustandSetFnType = (
  partial: AppState | Partial<AppState> | ((state: AppState) => AppState | Partial<AppState>),
  replace?: boolean | undefined
) => void;

export type ListsByIdType = {
  [listId: string]: ListType;
};

export type CardModalStateType = {
  show: boolean;
  card?: CardType;
};

export type BoardStateType = {
  title: string;
};

export type MoveCardParamsType = {
  cardId: string;
  list: ListType;
  pos: number;
};

export type MoveCardToListParamsType = {
  cardId: string;
  fromList: ListType;
  toList: ListType;
  pos: number;
};

export type MoveListParamsType = {
  fromList: ListType;
  toList: ListType;
  fromIndex: number;
  toIndex: number;
};
