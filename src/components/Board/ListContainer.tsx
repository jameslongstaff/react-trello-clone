import React, { useEffect, useRef, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import ListType from "../../types/ListType";
import List from "../List/List";

type ListContainerPropsType = {
  list: ListType;
};

const ListContainer = (props: ListContainerPropsType) => {
  const { setNodeRef, isOver, node } = useDroppable({
    id: props.list.id,
  });

  const [listHeight, setListHeight] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current?.clientHeight && !listHeight) {
      setListHeight(listRef.current?.clientHeight);
    }
  }, [listRef.current?.clientHeight]);

  return (
    <div
      ref={setNodeRef}
      key={props.list.id}
      className={`w-64 mr-2 h-96 relative ${isOver ? "" : ""}`}
    >
      {}
      {isOver && (
        <div
          className="bg-[#943c2a] absolute top-0 left-0 w-full rounded-[3px]"
          style={{ height: listHeight }}
        ></div>
      )}
      <div ref={listRef}>
        <List list={props.list} />
      </div>
    </div>
  );
};

export default ListContainer;
