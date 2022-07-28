import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import CardType from "../../types/CardType";
import { updateCard } from "../../utils/persistence";
import useBoardStore from "../../hooks/useBoardStore";

const Card = (props: any) => {
  const wrapperRef = useRef(null);
  const [isQuickEditing, setIsQuickEditing] = useState<boolean>(false);
  const [card, setCard] = useState<CardType>(props.card);
  const boardStore = useBoardStore();

  useOutsideAlerter(wrapperRef, () => {
    setIsQuickEditing(false);
  });

  const handleBoardUpdate = () => {
    const updatedBoard = updateCard(card);
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

  return (
    <div className="group text-sm bg-white rounded-[3px] shadow-sm w-full h-20 mb-2 p-2 hover:bg-[#f4f5f7] cursor-pointer">
      {isQuickEditing && (
        <div className="absolute top-0 left-0 h-[100vh] w-full bg-[#0009]"></div>
      )}
      <div className="relative">
        <button
          onClick={() => setIsQuickEditing(true)}
          className="absolute opacity-0 group-hover:opacity-100 top-0 right-0 hover:bg-[#cfcfcf52] px-2 py-1 rounded-[3px]"
        >
          <FontAwesomeIcon
            className="text-[#6b778c] w-[0.65rem]"
            icon={["fas", "pen"]}
          />
        </button>
        <h3>{card.title}</h3>
        {isQuickEditing && (
          <div
            ref={wrapperRef}
            className="absolute top-0 left-0 w-full h-full z-20"
          >
            <textarea
              className="w-full h-32 bg-white rounded-[3px] shadow-sm  p-2"
              defaultValue={card.title}
              onChange={(event) => handleChange(event)}
            />
            <button
              onClick={() => handleBoardUpdate()}
              className={`text-white py-1 px-2 text-sm rounded-[3px] bg-[#0079bf] hover:bg-[#026aa7]`}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
