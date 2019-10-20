import React, { ReactElement } from "react";
import classes from "./ContextMenu.module.css";
import ClickOutside from "../ClickOutside/ClickOutside";

interface IContextMenuProps {
  onClose(): void;
  children: ReactElement<any> | null;
}

const ContextMenu = (props: IContextMenuProps) => {
  return (
    <ClickOutside handleClickOutside={props.onClose}>
      {/* <Backdrop show /> */}
      <div className={classes.ContextMenu}>{props.children}</div>
    </ClickOutside>
  );
};

export default ContextMenu;
