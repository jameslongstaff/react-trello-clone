import { useSortable } from "@dnd-kit/sortable";
import CardType from "../../types/CardType";
import Card from "./Card";

export type DraggableCardPropsType = {
  card: CardType;
};

const DraggableCard = (props: DraggableCardPropsType) => {
  const {
    node,
    setNodeRef,
    listeners,
    attributes,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: props.card.id,
    transition: {
      duration: 100,
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <Card
      height={node.current?.clientHeight}
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
      isDragging={isDragging}
      {...props}
    ></Card>
  );
};

export default DraggableCard;
