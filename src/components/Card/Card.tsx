import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardType from "../../types/CardType";
import { deleteCard, updateCard } from "../../utils/persistence";
import useBoardStore from "../../hooks/useBoardStore";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export type CardPropsType = {
  height?: number;
  card: CardType;
  style?: CSSProperties;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap | undefined;
  isDragging?: boolean;
  isOverlay?: boolean;
};

const Card = forwardRef((props: CardPropsType, ref: any) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isQuickEditing, setIsQuickEditing] = useState<boolean>(false);
  const [card, setCard] = useState<CardType>(props.card);
  const boardStore = useBoardStore();

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isQuickEditing]);

  const handleBackdropClick = (e: any) => {
    e.stopPropagation();
    setIsQuickEditing(false);
  };

  const handleSaveCard = () => {
    updateCard(card);
    boardStore.updateCard(card);
    setIsQuickEditing(false);
  };

  const handleDeleteCard = (e: React.MouseEvent) => {
    deleteCard(card);
    boardStore.removeCardFromList(card.listId, card.id);
    setIsQuickEditing(false);
  };

  const handleChange = (event: any) => {
    const updatedCard = {
      ...structuredClone(card),
      title: event.target.value,
    };

    setCard(updatedCard);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSaveCard();
    }

    if (event.key === "Escape") {
      setIsQuickEditing(false);
    }
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setIsQuickEditing(true);
  };

  const handleCardClick = () => {
    boardStore.setCardModal(props.card);
  };

  return (
    <div
      style={props.style}
      {...props.listeners}
      {...props.attributes}
      ref={ref}
      onClick={handleCardClick}
      className={`relative mb-2`}
    >
      {!props.isDragging ? (
        <div
          className={`bg-white group text-sm  rounded-[3px] shadow-sm w-full h-16 p-2 hover:bg-[#f4f5f7] cursor-pointer relative origin-bottom-left ${
            props.isOverlay && "rotate-3"
          }`}
        >
          <button
            onClick={(e) => handleClick(e)}
            className="absolute opacity-0 group-hover:opacity-100 top-0 right-0 hover:bg-[#cfcfcf52] px-2 py-1 rounded-[3px] m-1"
          >
            <FontAwesomeIcon
              className="text-[#6b778c] w-[0.65rem]"
              icon={["fas", "pen"]}
            />
          </button>
          <h3>{card.title}</h3>
          {isQuickEditing && (
            <>
              <div
                onClick={(e) => handleBackdropClick(e)}
                className="fixed top-0 left-0 h-[100vh] w-full bg-[#0009] z-40"
              ></div>
              <div className="absolute top-0 left-0 w-full h-full z-40">
                <div className="w-full h-full">
                  <textarea
                    ref={inputRef}
                    className="w-full h-28 bg-white rounded-[3px] shadow-sm p-2"
                    defaultValue={card.title}
                    onChange={(event) => handleChange(event)}
                    onKeyDown={(event) => handleKeyPress(event)}
                  />
                  <button
                    onClick={handleSaveCard}
                    className={`text-white py-1 px-2 text-sm rounded-[3px] bg-[#0079bf] hover:bg-[#026aa7]`}
                  >
                    Save
                  </button>
                </div>
                <div className="absolute top-0 left-full ml-2 w-28 z-20">
                  <button
                    onClick={(e) => handleDeleteCard(e)}
                    className="block px-3 py-2 mb-2 left-0 text-white bg-[#0009] hover:bg-[#000c] rounded-[3px] transition-all hover:left-1 relative"
                  >
                    Delete card
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="bg-[#091e4214] rounded-[3px] h-16 relative z-10"></div>
      )}
    </div>
  );
});

export default Card;
