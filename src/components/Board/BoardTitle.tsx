import React from "react";
import useBoardStore from "../../hooks/useBoardStore";
import { getBoard, setBoard } from "../../utils/persistence";
import EditableTitle from "../EditableTitle";

export type BoardTitleType = {
  title: string;
};

const BoardTitle = (props: BoardTitleType) => {
  const boardStore = useBoardStore();

  const handleBoardUpdate = (title: string) => {
    const board = getBoard();
    const boardUpdate = { ...board, title: title };
    setBoard(boardUpdate);
    boardStore.setBoard(boardUpdate);
  };

  return (
    <EditableTitle
      title={props.title}
      tag="h1"
      onSave={handleBoardUpdate}
      className="font-semibold text-white text-2xl hover:bg-[#ffffff3d] rounded-[3px]"
      spacingClass="px-2"
    />
  );
};

export default BoardTitle;
