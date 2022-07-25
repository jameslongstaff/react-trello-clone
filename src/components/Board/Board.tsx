import React, { useEffect, useState } from "react";
import BoardType from "../../types/BoardType";
import ListType from "../../types/ListType";
import List from "../List/List";
import BoardTitle from "./BoardTitle";
import { v4 as uuidv4 } from "uuid";

const Board = () => {
  const [board, setBoard] = useState<BoardType | undefined>(undefined);

  useEffect(() => {
    if (!localStorage.getItem("board")) {
      localStorage.setItem("board", JSON.stringify({ lists: [] }));
    }

    const board = JSON.parse(localStorage.getItem("board")!);

    setBoard(board);
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

    setBoard(board);
  };

  return !!board ? (
    <>
      <BoardTitle title={board.title} />

      <div className="font-bold">Text red</div>

      <button onClick={() => createList()}>Create List</button>

      {board.lists.map((list: ListType) => {
        return <List list={list} />;
      })}
    </>
  ) : (
    <p>No board</p>
  );
};

export default Board;
