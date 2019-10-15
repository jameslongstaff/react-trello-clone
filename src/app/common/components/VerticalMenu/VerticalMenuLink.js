import React from "react";
import classes from "./VerticalMenuLink.module.css";

const VerticalMenuLink = props => {
  return (
    <button onClick={props.onClick} className={classes.VerticalMenuLink}>
      {props.children}
    </button>
  );
};

export default VerticalMenuLink;
