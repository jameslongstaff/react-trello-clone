import React, { useEffect } from "react";
import ListType from "../../types/ListType";
import List from "../List/List";
import BoardTitle from "./BoardTitle";
import useBoardStore from "../../hooks/useBoardStore";
import { getBoard } from "../../utils/persistence";
import ListCreator from "./ListCreator";

const Board = () => {
  const boardStore = useBoardStore();

  useEffect(() => {
    const board = getBoard();

    boardStore.setBoard(board);
  }, []);

  return !!boardStore.board ? (
    <>
      <div className="inline-flex">
        <BoardTitle title={boardStore.board.title} />
      </div>

      <div className="w-full">
        <div className="mt-2 flex-nowrap inline-flex">
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
