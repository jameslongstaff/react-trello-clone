import { useSortable } from "@dnd-kit/sortable";
import CardType from "../../types/CardType";
import Card from "./Card";

export type DraggableCardPropsType = {
  card: CardType;
};

const DraggableCard = (props: DraggableCardPropsType) => {
  const {
    setNodeRef,
    listeners,
    attributes,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: props.card.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <Card
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
