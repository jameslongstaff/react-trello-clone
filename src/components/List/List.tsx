import React, { CSSProperties, forwardRef } from "react";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import useBoardStore from "../../hooks/useBoardStore";
import CardType from "../../types/CardType";
import ListType from "../../types/ListType";
import { deleteList, updateList } from "../../utils/persistence";
import CardCreator from "./CardCreator";
import DraggableCard from "../Card/DraggableCard";
import ListHeader from "./ListHeader";

export type ListPropsType = {
  height?: number;
  isDragging?: boolean;
  list: ListType;
  style?: CSSProperties;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
  isOverlay?: boolean;
};

const List = forwardRef((props: ListPropsType, ref: React.Ref<HTMLDivElement>) => {
  const boardStore = useBoardStore();

  const handleListSave = (title: string) => {
    const updatedList = { ...props.list, title };
    updateList({ ...props.list, title });
    boardStore.setList(updatedList);
  };

  const handleDeleteList = () => {
    deleteList(props.list.id);
    boardStore.removeListFromBoard(props.list.id);
  };

  const cardsByListId = (listId: string): CardType[] => {
    return boardStore.listsById[listId].cards;
  };

  const dragStyle = props.isOverlay && "origin-bottom-left rotate-3";

  console.log(props.height);

  return props.list ? (
    <div
      className="relative w-64 mr-2"
      ref={ref}
      style={props.style}
      {...props.attributes}
      {...props.listeners}>
      {!props.isDragging ? (
        <div
          className={`bg-[#ebecf0] rounded-[3px] border-solid border-[#ccc] shadow-sm self-start origin-bottom-left ${dragStyle}`}>
          <SortableContext
            items={cardsByListId(props.list.id)}
            strategy={verticalListSortingStrategy}>
            <div className="p-2 w-full">
              <ListHeader
                onSaveTitle={handleListSave}
                onDeleteList={handleDeleteList}
                list={props.list}
              />

              {props.list.cards &&
                props.list.cards.map((card: CardType) => (
                  <DraggableCard key={card.id} card={card} />
                ))}

              <CardCreator listId={props.list.id} />
            </div>
          </SortableContext>
        </div>
      ) : (
        <div
          style={{ height: `${props.height}px` }}
          className="bg-[#943c2a] rounded-[3px] border-solid border-[#ccc] shadow-sm self-start origin-bottom-left"></div>
      )}
    </div>
  ) : (
    <></>
  );
});

List.displayName = "List";

export default List;
