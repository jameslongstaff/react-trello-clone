import React, { useEffect } from "react";
import ListType from "../../types/ListType";
import BoardTitle from "./BoardTitle";
import useBoardStore from "../../hooks/useBoardStore";
import { getBoard, moveList } from "../../utils/persistence";
import ListCreator from "./ListCreator";
import ListContainer from "./ListContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardModal from "../Card/CardModal";
import { DndContext } from "@dnd-kit/core";

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

  const handleDragEnd = (params: any) => {
    const [src, dest] = [params?.active?.id, params?.over?.id];

    if (src && dest) {
      const board = moveList(dest, src);
      boardStore.setBoard(board);
    }
  };

  return !!boardStore.board ? (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="inline-flex">
        <BoardTitle title={boardStore.board.title} />
        <button
          className="text-white ml-2 bg-[#ffffff3d] hover:bg-[#ffffff52] px-3 text-sm rounded-[3px]"
          onClick={clearAll}
        >
          <FontAwesomeIcon className="mr-2" icon={["fas", "xmark"]} />
          Clear all
        </button>
      </div>

      <div className="w-full">
        <div className="mt-4 flex-nowrap inline-flex">
          {boardStore.board.lists.map((list: ListType) => {
            return <ListContainer key={list.id} list={list} />;
          })}

          <ListCreator></ListCreator>
        </div>
      </div>
      <CardModal />
    </DndContext>
  ) : (
    <p>No board</p>
  );
};

export default Board;
