import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useBoardStore from "../../hooks/useBoardStore";
import EditableTitle from "../EditableTitle";

const CardModal = () => {
  const boardStore = useBoardStore();

  const closeModal = () => {
    boardStore.resetCardModal();
  };

  return boardStore.cardModal.card ? (
    <div className="absolute h-[100vh] w-full top-0 left-0">
      <div
        className="absolute top-0 left-0 h-[100vh] w-full bg-[#0009]"
        onClick={closeModal}
      ></div>
      <div className="w-4/6 mt-[48px] mb-[80px] mx-auto bg-[#f4f5f7] relative z-20 rounded-[3px] px-6 py-4">
        <div className="flex mb-2">
          <EditableTitle
            className="text-xl font-semibold"
            title={boardStore.cardModal.card.title}
            tag="h2"
          />
          <button className="ml-auto" onClick={closeModal}>
            <FontAwesomeIcon
              className="text-[#6b778c] w-[1.25rem] h-[1.25rem]"
              icon={["fas", "xmark"]}
            />
          </button>
        </div>

        <h3>Description</h3>

        <p>{boardStore.cardModal.card.content || ""}</p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CardModal;
