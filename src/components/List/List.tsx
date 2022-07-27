import React from "react";
import CardType from "../../types/CardType";
import CardCreator from "./CardCreator";

const List = (props: any) => {
  return !!props.list ? (
    <div className="w-64 mr-2 bg-[#ebecf0] rounded-[3px] border-solid border-[#ccc] shadow-sm">
      <div className="p-3 w-full">
        <h2 className="font-semibold mb-2 ml-1">{props.list.title}</h2>

        {props.list.cards &&
          props.list.cards.map((card: CardType) => {
            return (
              <div
                className="bg-white rounded-[3px] shadow-sm w-full h-20 mb-2 p-2"
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
