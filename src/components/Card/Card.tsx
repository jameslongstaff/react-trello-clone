import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";

const Card = (props: any) => {
  const wrapperRef = useRef(null);
  const [isQuickEditing, setIsQuickEditing] = useState<boolean>(false);

  useOutsideAlerter(wrapperRef, () => {
    setIsQuickEditing(false);
  });

  return (
    <div
      className="group text-sm bg-white rounded-[3px] shadow-sm w-full h-20 mb-2 p-2 hover:bg-[#f4f5f7] cursor-pointer"
      key={props.card.id}
    >
      {isQuickEditing && (
        <div className="absolute top-0 left-0 h-[100vh] w-full bg-[#0009]"></div>
      )}
      <div className="relative">
        <button
          onClick={() => setIsQuickEditing(true)}
          className="absolute opacity-0 group-hover:opacity-100 top-0 right-0 hover:bg-[#cfcfcf52] px-2 py-1 rounded-[3px]"
        >
          <FontAwesomeIcon
            className="text-[#6b778c] w-[0.65rem]"
            icon={["fas", "pen"]}
          />
        </button>
        <h3>{props.card.title}</h3>
        {isQuickEditing && (
          <div ref={wrapperRef} className="absolute top-0 left-0 w-full h-full">
            <textarea className="w-full h-24 bg-white rounded-[3px] shadow-sm  p-2">
              {props.card.title}
            </textarea>
            <button
              className={`text-white py-1 px-2 text-sm rounded-[3px] bg-[#0079bf] hover:bg-[#026aa7]`}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
