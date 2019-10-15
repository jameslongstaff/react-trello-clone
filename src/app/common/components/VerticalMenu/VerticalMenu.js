import React from "react";
import classes from "./VerticalMenu.module.css";

const VerticalMenu = props => {
  return <div className={classes.VerticalMenu}>{props.children}</div>;
};

export default VerticalMenu;
