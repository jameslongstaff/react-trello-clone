import React, { useEffect, useRef, useState } from "react";
import ListType from "../../types/ListType";
import List from "../List/List";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

type ListContainerPropsType = {
  list: ListType;
};

const ListContainer = (props: ListContainerPropsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id: props.list.id });

  const [listHeight, setListHeight] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current?.clientHeight && !listHeight) {
      setListHeight(listRef.current?.clientHeight);
    }
  }, [listRef.current?.clientHeight]);

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <div className="relative mr-2">
      {isOver && (
        <div
          className="bg-[#943c2a] absolute top-0 left-0 w-full rounded-[3px]"
          style={{ height: listHeight }}
        ></div>
      )}
      <div
        key={props.list.id}
        className={`w-64 h-96 relative ${isDragging && "z-20"}`}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div ref={listRef}>
          <List list={props.list} isDragging={isDragging} />
        </div>
      </div>
    </div>
  );
};

export default ListContainer;
