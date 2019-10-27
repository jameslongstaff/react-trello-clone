import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
    from {
        top: 28px;
        left: 28px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    to {
        top: -1px;
        left: -1px;
        width: 58px;
        height: 58px;
        opacity: 0;
    }
`;

const SpinnerDiv = styled.div`
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: ${animation} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  &:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

const Wrapper = styled.div`
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0;
  right: 0;
  z-index: 2;
`;

interface ISpinnerProps {}

const Spinner: React.FC<ISpinnerProps> = props => {
  return (
    <React.Fragment>
      <Backdrop opacity="0.1" />
      <Wrapper>
        <SpinnerDiv />
        <SpinnerDiv />
      </Wrapper>
    </React.Fragment>
  );
};

export default Spinner;
