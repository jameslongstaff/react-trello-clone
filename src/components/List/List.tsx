import React, { CSSProperties, forwardRef } from "react";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import useBoardStore from "../../hooks/useBoardStore";
import CardType from "../../types/CardType";
import ListType from "../../types/ListType";
import { deleteList, updateList } from "../../utils/persistence";
import EditableTitle from "../EditableTitle";
import PopOutMenu, { PopoutMenuItemType } from "../PopOutMenu";
import CardCreator from "./CardCreator";
import DraggableCard from "../Card/DraggableCard";

export type ListPropsType = {
  list: ListType;
  style?: CSSProperties;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
};

const List = forwardRef((props: ListPropsType, ref: any) => {
  const boardStore = useBoardStore();

  const handleBoardUpdate = (title: string) => {
    const updatedBoard = updateList({ ...props.list, title });
    boardStore.setBoard(updatedBoard);
  };

  const handleDeleteList = () => {
    const updatedBoard = deleteList(props.list.id);
    boardStore.setBoard(updatedBoard);
  };

  const listMenuItems: PopoutMenuItemType[] = [
    { title: "Delete list", fn: handleDeleteList },
  ];

  return !!props.list ? (
    <div
      className={`bg-[#ebecf0] rounded-[3px] border-solid border-[#ccc] shadow-sm self-start origin-bottom-left relative w-64 mr-2`}
      ref={ref}
      style={props.style}
      {...props.attributes}
      {...props.listeners}
    >
      <SortableContext
        items={boardStore.listsById[props.list.id].cards}
        strategy={verticalListSortingStrategy}
      >
        <div className="p-2 w-full">
          <header className="flex mb-2">
            <EditableTitle
              title={props.list.title}
              tag="h2"
              onSave={handleBoardUpdate}
              className="font-semibold text-base"
            />
            <PopOutMenu items={listMenuItems} className="ml-auto" />
          </header>

          {props.list.cards &&
            props.list.cards.map((card: CardType) => (
              <DraggableCard key={card.id} card={card} />
            ))}

          <CardCreator listId={props.list.id} />
        </div>
      </SortableContext>
    </div>
  ) : (
    <></>
  );
});

export default List;
