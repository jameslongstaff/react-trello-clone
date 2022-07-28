import React, { useState } from "react";
import useBoardStore from "../../hooks/useBoardStore";
import CardType from "../../types/CardType";
import { setBoardTitle } from "../../utils/board";
import { getBoard } from "../../utils/persistence";
import EditableTitle from "../EditableTitle";
import CardCreator from "./CardCreator";

const List = (props: any) => {
  const boardStore = useBoardStore();

  const handleSaveTitle = (title: string) => {
    // const board = getBoard();
    // const updatedBoard = setBoardTitle(board, title);
    // boardStore.setBoard(updatedBoard);
  };

  return !!props.list ? (
    <div className="w-64 mr-2 bg-[#ebecf0] rounded-[3px] border-solid border-[#ccc] shadow-sm self-start">
      <div className="p-2 w-full">
        <EditableTitle
          title={props.list.title}
          tag="h2"
          onSave={handleSaveTitle}
          className="font-semibold text-regular ml-1 mb-2"
        />

        {props.list.cards &&
          props.list.cards.map((card: CardType) => {
            return (
              <div
                className="bg-white rounded-[3px] shadow-sm w-full h-20 mb-2 p-2 hover:bg-[#f4f5f7] cursor-pointer"
                key={card.id}
              >
                <h3>{card.title}</h3>
              </div>
            );
          })}
        <CardCreator listId={props.list.id} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default List;
