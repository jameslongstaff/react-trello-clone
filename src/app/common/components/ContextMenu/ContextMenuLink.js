import React from "react";
import classes from "./ContextMenuLink.module.css";

const ContextMenuLink = props => {
  return (
    <div className={classes.ContextMenuLink}>
      <button onClick={props.onClick}>{props.children}</button>
    </div>
  );
};

export default ContextMenuLink;
