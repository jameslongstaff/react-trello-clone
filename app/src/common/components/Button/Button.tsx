import React, { ReactElement } from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick(): void;
  primary?: boolean;
  small?: boolean;
  children?: ReactElement<any> | null;
}

const Wrapper = styled.button`
  border-radius: 3px;
  background-color: ${(props: ButtonProps) =>
    props.primary ? "#5aac44" : "#eee"};
  box-shadow: ${(props: ButtonProps) =>
    props.primary ? "0 1px 0 0 #3f6f21" : "0 2px 0 0 #ddd"};
  border: none;
  cursor: pointer;
  color: ${(props: ButtonProps) => (props.primary ? "#fff" : "#999")};
  display: block;
  font-size: ${(props: ButtonProps) => (props.small ? "0.8rem" : "0.9rem")};
  font-weight: 600;
  padding: ${(props: ButtonProps) =>
    props.small ? "0.35rem 1rem" : "0.3rem 0"};
  width: 100%;
`;

const Button = (props: ButtonProps) => {
  return (
    <Wrapper
      primary={props.primary}
      small={props.small}
      onClick={props.onClick}
    >
      {props.children}
    </Wrapper>
  );
};

export default Button;
