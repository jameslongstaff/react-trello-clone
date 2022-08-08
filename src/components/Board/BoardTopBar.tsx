import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BoardTitle from "./BoardTitle";
import useBoardStore from "../../hooks/useBoardStore";
import { getBoard } from "../../utils/persistence";

const BoardTopBar = () => {
  const boardStore = useBoardStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const clearAll = () => {
    localStorage.clear();
    boardStore.initBoard(getBoard());
  };

  return (
    <>
      <div className="inline-flex w-full z-20 relative">
        <div>
          <BoardTitle title={boardStore.board.title} />
        </div>
        <button
          className="text-white ml-2 bg-[#ffffff3d] hover:bg-[#ffffff52] px-3 text-sm rounded-[3px]"
          onClick={clearAll}>
          <FontAwesomeIcon className="mr-2" icon={["fas", "xmark"]} />
          Clear all
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white ml-auto bg-[#ffffff3d] hover:bg-[#ffffff52] px-3 text-sm rounded-[3px] relative ">
          <FontAwesomeIcon className="text-[#fff] mr-2" icon={["fas", "ellipsis"]} />
          Show menu
        </button>
      </div>
    </>
  );
};

export default BoardTopBar;
