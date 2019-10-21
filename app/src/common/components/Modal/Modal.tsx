import React, { ReactElement } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";
import { CSSProperties } from "styled-components";

interface IModalProps {
  hideHandler(): void;
  show: boolean;
  style?: CSSProperties;
  children?: ReactElement<any>;
}

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
  const backdrop = props.show && <Backdrop onClick={props.hideHandler} />;

  return (
    <React.Fragment>
      {backdrop}
      <div style={props.style} className={classes.Modal}>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default Modal;
