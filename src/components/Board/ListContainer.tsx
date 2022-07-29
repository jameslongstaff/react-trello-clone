import React, { useEffect } from "react";
import { useDroppable } from "@dnd-kit/core";
import useBoardStore from "../../hooks/useBoardStore";
import ListType from "../../types/ListType";
import { moveList } from "../../utils/persistence";
import List from "../List/List";

type ListContainerPropsType = {
  list: ListType;
};

const ListContainer = (props: ListContainerPropsType) => {
  const { setNodeRef } = useDroppable({
    id: props.list.id,
  });

  return (
    <div ref={setNodeRef} key={props.list.id} className="w-64">
      <List list={props.list} />
    </div>
  );
};

export default ListContainer;
