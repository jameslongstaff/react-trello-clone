import React from "react";
import CardType from "../../types/CardType";
import CardCreator from "./CardCreator";

const List = (props: any) => {
  return !!props.list ? (
    <div className="list">
      <div className="list-container p-4">{props.list.title}</div>

      {props.list.cards &&
        props.list.cards.map((card: CardType) => {
          return <div key={card.id}>{card.title}</div>;
        })}
      <CardCreator listId={props.list.id} />
    </div>
  ) : (
    <></>
  );
};

export default List;
