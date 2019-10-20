import React, { ReactElement } from "react";
import classes from "./ContextMenuLink.module.css";

interface IContextMenuLinkProps {
  onClick(): void;
  children: ReactElement<any> | null;
}

const ContextMenuLink = (props: IContextMenuLinkProps) => {
  return (
    <div className={classes.ContextMenuLink}>
      <button onClick={props.onClick}>{props.children}</button>
    </div>
  );
};

export default ContextMenuLink;
