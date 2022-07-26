import React, { useEffect, useState } from "react";
import ListType from "../../types/ListType";
import List from "../List/List";
import BoardTitle from "./BoardTitle";
import { v4 as uuidv4 } from "uuid";
import useBoardStore from "../../hooks/useBoardStore";

const Board = () => {
  const boardStore = useBoardStore();

  console.log(111, boardStore.board);

  useEffect(() => {
    if (!localStorage.getItem("board")) {
      localStorage.setItem("board", JSON.stringify({ lists: [] }));
    }

    const board = JSON.parse(localStorage.getItem("board")!);

    boardStore.setBoard(board);
  }, []);

  // useCallback
  const createList = () => {
    const newList: ListType = {
      id: uuidv4(),
      title: "title",
      cards: [],
    };

    const board = JSON.parse(localStorage.getItem("board")!);

    board.lists = board.lists.concat([newList]);

    localStorage.setItem("board", JSON.stringify(board));

    boardStore.setBoard(board);
  };

  return !!boardStore.board ? (
    <>
      <BoardTitle title={boardStore.board.title} />

      <div className="font-bold">Text red</div>

      <button onClick={() => createList()}>Create List</button>

      <div className="w-full mt-2">
        {boardStore.board.lists.map((list: ListType) => {
          return <List key={list.id} list={list} />;
        })}
      </div>
    </>
  ) : (
    <p>No board</p>
  );
};

export default Board;
