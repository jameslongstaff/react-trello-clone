import React, { useEffect, useState } from "react";
import ListType from "../../types/ListType";
import List from "../List/List";
import BoardTitle from "./BoardTitle";
import useBoardStore from "../../hooks/useBoardStore";
import { addListToBoard, getBoard } from "../../utils/persistence";

const Board = () => {
  const boardStore = useBoardStore();

  useEffect(() => {
    boardStore.setBoard(getBoard());
  }, []);

  // useCallback
  const createList = () => {
    boardStore.setBoard(addListToBoard("title"));
  };

  return !!boardStore.board ? (
    <>
      <BoardTitle title={boardStore.board.title} />

      <div className="font-bold">Text red</div>

      <button onClick={() => createList()}>Create List</button>

      <div className="w-full">
        <div className="mt-2 flex-nowrap inline-flex">
          {boardStore.board.lists.map((list: ListType) => {
            return <List key={list.id} list={list} />;
          })}
        </div>
      </div>
    </>
  ) : (
    <p>No board</p>
  );
};

export default Board;
