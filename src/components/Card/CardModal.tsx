import React from "react";
import useBoardStore from "../../hooks/useBoardStore";

const CardModal = () => {
  const boardStore = useBoardStore();

  const handleBackdropClick = () => {
    boardStore.resetCardModal();
  };

  return boardStore.cardModal.cardId ? (
    <div className="absolute h-[100vh] w-full top-0 left-0">
      <div
        className="absolute top-0 left-0 h-[100vh] w-full bg-[#0009]"
        onClick={handleBackdropClick}
      ></div>
      <div className="w-4/6 mt-[48px] mb-[80px] mx-auto bg-[#f4f5f7] relative z-20 rounded-[3px] p-3">
        <h2 className="text-lg font-semibold">Card title</h2>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default CardModal;
