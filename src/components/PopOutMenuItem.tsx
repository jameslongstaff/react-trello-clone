import React from "react";
import { PopoutMenuItemType } from "./PopOutMenu";

export type PopOutMenuPropsType = {
  item: PopoutMenuItemType;
  onClick?: () => void;
};

const PopOutMenuItem = (props: PopOutMenuPropsType) => {
  return (
    <a
      onClick={props.onClick}
      className="text-left block w-full py-2 px-3 text-[#172b4d] hover:bg-[#091e420a]"
    >
      {props.item.title}
    </a>
  );
};

export default PopOutMenuItem;
