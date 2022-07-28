import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useBoardStore from "../../hooks/useBoardStore";
import CardType from "../../types/CardType";
import { updateList } from "../../utils/persistence";
import EditableTitle from "../EditableTitle";
import PopOutMenu from "../PopOutMenu";
import CardCreator from "./CardCreator";

const List = (props: any) => {
  const boardStore = useBoardStore();

  const handleBoardUpdate = (title: string) => {
    const updatedBoard = updateList({ ...props.list, title });
    boardStore.setBoard(updatedBoard);
  };

  return !!props.list ? (
    <div className="w-64 mr-2 bg-[#ebecf0] rounded-[3px] border-solid border-[#ccc] shadow-sm self-start">
      <div className="p-2 w-full">
        <header className="flex mb-2">
          <EditableTitle
            title={props.list.title}
            tag="h2"
            onSave={handleBoardUpdate}
            className="font-semibold text-base"
          />
          <PopOutMenu className="ml-auto mr-2" />
        </header>

        {props.list.cards &&
          props.list.cards.map((card: CardType) => {
            return (
              <div
                className="text-sm bg-white rounded-[3px] shadow-sm w-full h-20 mb-2 p-2 hover:bg-[#f4f5f7] cursor-pointer"
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
