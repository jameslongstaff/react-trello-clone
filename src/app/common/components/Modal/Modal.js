import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";
import { Container, Row, Col } from "reactstrap";

const Modal = props => {
  return (
    <React.Fragment>
      <Backdrop onClick={props.hideHandler} show={props.show} />
      <div style={props.style} className={classes.Modal}>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default Modal;
