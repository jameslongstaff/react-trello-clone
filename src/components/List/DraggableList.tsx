import { useSortable } from "@dnd-kit/sortable";
import ListType from "../../types/ListType";
import List from "./List";

export interface DraggableListProps {
  list: ListType;
}

function DraggableList(props: DraggableListProps) {
  const { attributes, listeners, setNodeRef, transform, transition, node, isDragging } =
    useSortable({
      id: props.list.id,
      data: {
        type: "container",
        children: props.list.cards.map((card) => card.id)
      },
      transition: {
        duration: 100,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)"
      }
    });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : "",
    transition: transition,
    opacity: 1
  };

  return (
    <List
      isDragging={isDragging}
      height={node.current?.clientHeight}
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      {...props}
    />
  );
}

export default DraggableList;
