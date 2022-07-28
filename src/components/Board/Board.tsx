import React, { useEffect } from "react";
import ListType from "../../types/ListType";
import List from "../List/List";
import BoardTitle from "./BoardTitle";
import useBoardStore from "../../hooks/useBoardStore";
import { getBoard } from "../../utils/persistence";
import ListCreator from "./ListCreator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Board = () => {
  const boardStore = useBoardStore();

  useEffect(() => {
    const board = getBoard();
    boardStore.setBoard(board);
  }, []);

  const clearAll = () => {
    localStorage.clear();
    boardStore.resetBoard();
  };

  return !!boardStore.board ? (
    <>
      <div className="inline-flex">
        <BoardTitle title={boardStore.board.title} />
        <button
          className="text-white ml-2 bg-[#ffffff3d] hover:bg-[#ffffff52] px-3 text-sm rounded-[3px]"
          onClick={clearAll}
        >
          <FontAwesomeIcon className=" mr-2" icon={["fas", "xmark"]} />
          Clear all
        </button>
      </div>

      <div className="w-full">
        <div className="mt-4 flex-nowrap inline-flex">
          {boardStore.board.lists.map((list: ListType) => {
            return <List key={list.id} list={list} />;
          })}

          <ListCreator></ListCreator>
        </div>
      </div>
    </>
  ) : (
    <p>No board</p>
  );
};

export default Board;
