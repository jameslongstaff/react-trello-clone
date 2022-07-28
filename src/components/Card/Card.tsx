import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = (props: any) => {
  return (
    <div
      className="text-sm bg-white rounded-[3px] shadow-sm w-full h-20 mb-2 p-2 hover:bg-[#f4f5f7] cursor-pointer relative"
      key={props.card.id}
    >
      <button className="absolute top-1 right-1 hover:bg-[#cfcfcf52] px-2 py-1 rounded-[3px]">
        <FontAwesomeIcon className="text-[#6b778c] w-3" icon={["fas", "pen"]} />
      </button>
      <h3>{props.card.title}</h3>
    </div>
  );
};

export default Card;
