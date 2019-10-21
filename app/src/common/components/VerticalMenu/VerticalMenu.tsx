import React, { ReactElement } from "react";
import classes from "./VerticalMenu.module.css";

interface IVerticalMenuProps {
  children?: ReactElement<any>;
}

const VerticalMenu: React.FC<IVerticalMenuProps> = props => {
  return <div>{props.children}</div>;
};

export default VerticalMenu;
