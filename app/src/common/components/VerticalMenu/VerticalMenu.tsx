import React, { ReactElement } from "react";
import classes from "./VerticalMenu.module.css";

interface IVerticalMenuProps {
  children?: ReactElement<any>;
}

const VerticalMenu = (props: IVerticalMenuProps) => {
  return <div>{props.children}</div>;
};

export default VerticalMenu;
