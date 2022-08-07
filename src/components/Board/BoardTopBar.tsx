import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BoardTitle from "./BoardTitle";
import useBoardStore from "../../hooks/useBoardStore";
import { getBoard } from "../../utils/persistence";

const BoardTopBar = () => {
  const boardStore = useBoardStore();

  const clearAll = () => {
    localStorage.clear();
    boardStore.initBoard(getBoard());
  };

  return (
    <div className="inline-flex">
      <div>
        <BoardTitle title={boardStore.board.title} />
      </div>
      <button
        className="text-white ml-2 bg-[#ffffff3d] hover:bg-[#ffffff52] px-3 text-sm rounded-[3px]"
        onClick={clearAll}
      >
        <FontAwesomeIcon className="mr-2" icon={["fas", "xmark"]} />
        Clear all
      </button>
    </div>
  );
};

export default BoardTopBar;
