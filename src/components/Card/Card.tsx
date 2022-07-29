import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import CardType from "../../types/CardType";
import { deleteCard, updateCard } from "../../utils/persistence";
import useBoardStore from "../../hooks/useBoardStore";

const Card = (props: any) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isQuickEditing, setIsQuickEditing] = useState<boolean>(false);
  const [card, setCard] = useState<CardType>(props.card);
  const boardStore = useBoardStore();

  // useOutsideAlerter(wrapperRef, () => {
  //   console.log("outside");
  //   setIsQuickEditing(false);
  // });

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isQuickEditing]);

  const onBackdropClick = () => {
    setIsQuickEditing(false);
  };

  const handleSaveCard = () => {
    const updatedBoard = updateCard(card);
    boardStore.setBoard(updatedBoard);
    setIsQuickEditing(false);
  };

  const handleDeleteCard = (e: React.MouseEvent) => {
    const updatedBoard = deleteCard(card);
    boardStore.setBoard(updatedBoard);
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

  const handleClick = () => {
    setIsQuickEditing(true);
  };

  return (
    <div className="group text-sm bg-white rounded-[3px] shadow-sm w-full h-16 mb-2 p-2 hover:bg-[#f4f5f7] cursor-pointer">
      {isQuickEditing && (
        <div
          onClick={onBackdropClick}
          className="absolute top-0 left-0 h-[100vh] w-full bg-[#0009]"
        ></div>
      )}
      <div className="relative">
        <button
          onClick={handleClick}
          className="absolute opacity-0 group-hover:opacity-100 top-0 right-0 hover:bg-[#cfcfcf52] px-2 py-1 rounded-[3px]"
        >
          <FontAwesomeIcon
            className="text-[#6b778c] w-[0.65rem]"
            icon={["fas", "pen"]}
          />
        </button>
        <h3>{card.title}</h3>
        {isQuickEditing && (
          <div className="absolute top-0 left-0 w-full h-full z-20">
            <div ref={wrapperRef} className="w-full h-full">
              <textarea
                ref={inputRef}
                className="w-full h-28 bg-white rounded-[3px] shadow-sm  p-2"
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
            <div className="absolute top-0 left-full ml-2 w-28">
              <button
                onClick={(e) => handleDeleteCard(e)}
                className="block px-3 py-2 mb-2 left-0 text-white bg-[#0009] hover:bg-[#000c] rounded-[3px] transition-all hover:left-1 relative"
              >
                Delete card
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
