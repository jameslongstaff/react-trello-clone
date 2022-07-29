import React from "react";
import { useDrop } from "react-dnd";
import useBoardStore from "../../hooks/useBoardStore";
import ListType from "../../types/ListType";
import { getBoard, moveList } from "../../utils/persistence";
import List from "../List/List";

type ListContainerPropsType = {
  list: ListType;
};

const ListContainer = (props: ListContainerPropsType) => {
  const boardStore = useBoardStore();

  const [, drop] = useDrop(() => ({
    accept: ["List"],
    drop: (item: { id: string }) => {
      handleBoardUpdate(props.list.id, item.id);
    },
  }));

  const handleBoardUpdate = (dest: string, src: string) => {
    const board = moveList(dest, src);
    boardStore.setBoard(board);
  };

  return (
    <div ref={drop} key={props.list.id} className="w-64 h-full">
      <List list={props.list} />
    </div>
  );
};

export default ListContainer;
