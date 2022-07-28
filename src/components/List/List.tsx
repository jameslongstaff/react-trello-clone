import React, { useState } from "react";
import CardType from "../../types/CardType";
import EditableTitle from "../EditableTitle";
import CardCreator from "./CardCreator";

const List = (props: any) => {
  const [newTitle, setNewTitle] = useState(props.list.title);
  const [originalTitle, setOriginalTitle] = useState(props.list.title);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSaveTitle = () => {
    if (newTitle !== originalTitle) {
      if (newTitle !== "") {
        // persist
        // this.props.onSaveTitle(newTitle);
        setOriginalTitle(newTitle);
      } else {
        setNewTitle(originalTitle);
      }
    }
  };

  return !!props.list ? (
    <div className="w-64 mr-2 bg-[#ebecf0] rounded-[3px] border-solid border-[#ccc] shadow-sm self-start">
      <div className="p-2 w-full">
        <EditableTitle
          title={newTitle}
          tag="h2"
          onChange={handleChangeTitle}
          onSave={handleSaveTitle}
          className="font-semibold text-regular ml-1 :"
        />

        {props.list.cards &&
          props.list.cards.map((card: CardType) => {
            return (
              <div
                className="bg-white rounded-[3px] shadow-sm w-full h-20 mb-2 p-2 hover:bg-[#f4f5f7]"
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
