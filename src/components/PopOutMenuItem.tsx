import React from "react";

const PopOutMenuItem = (props: any) => {
  return (
    <a
      key={props.key}
      onClick={props.onClick}
      className="text-left block w-full py-2 px-3 text-[#172b4d] hover:bg-[#091e420a]"
    >
      {props.item.title}
    </a>
  );
};

export default PopOutMenuItem;
