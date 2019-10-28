import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  position: fixed;
  height: 100vh;
  width: 100%;
  left: 0;
  top: 0;
  opacity: ${(props: IBackdropProps) =>
    props.opacity ? props.opacity : "0.5"};
  background-color: #000;
  z-index: 1;
`;

interface IBackdropProps {
  opacity?: string;
  onClick?(): void;
}

const Backdrop: React.FC<IBackdropProps> = props => {
  return <Wrapper onClick={props.onClick} />;
};

export default Backdrop;
