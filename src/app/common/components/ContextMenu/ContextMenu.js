import React from "react";
import classes from "./ContextMenu.module.css";
import ClickOutside from "../ClickOutside/ClickOutside";

const ContextMenu = props => {
  return (
    <ClickOutside handleClickOutside={props.onClose}>
      {/* <Backdrop show /> */}
      <div className={classes.ContextMenu}>{props.children}</div>
    </ClickOutside>
  );
};

export default ContextMenu;
