import React from "react";
import useBoardStore from "../../hooks/useBoardStore";
import { setBoardTitle } from "../../utils/board";
import { getBoard } from "../../utils/persistence";
import EditableTitle from "../EditableTitle";

const BoardTitle = (props: any) => {
  const boardStore = useBoardStore();

  const handleSaveTitle = (title: string) => {
    const board = getBoard();
    const updatedBoard = setBoardTitle(board, title);
    boardStore.setBoard(updatedBoard);
  };

  console.log(props.title);

  return (
    <EditableTitle
      title={props.title}
      tag="h1"
      onSave={handleSaveTitle}
      className="font-semibold text-white text-2xl bg-[#ffffff3d] rounded-[3px]"
      spacingClass="px-2"
    />
  );
};

export default BoardTitle;
