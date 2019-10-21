import React, { ReactElement } from "react";
import classes from "./VerticalMenuLink.module.css";

interface IVerticalMenuLinkProps {
  onClick(): void;
  children?: ReactElement<any>;
}

const VerticalMenuLink: React.FC<IVerticalMenuLinkProps> = (
  props: IVerticalMenuLinkProps
) => {
  return (
    <button onClick={props.onClick} className={classes.VerticalMenuLink}>
      {props.children}
    </button>
  );
};

export default VerticalMenuLink;
