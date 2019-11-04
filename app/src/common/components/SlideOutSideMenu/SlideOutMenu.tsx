import React from "react";
import styled from "styled-components";
import ClickOutside from "../ClickOutside/ClickOutside";
import { Close } from "styled-icons/material/Close";

const Wrapper = styled.div<Pick<SlideOutMenuProps, 'open'>>`
  background-color: #f4f5f7;
  box-shadow: 0 12px 24px -6px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
  display: flex;
  height: 100vh;
  width: 20rem;
  position: fixed;
  right: ${(props) => (props.open ? "0" : "-20rem")};
  padding: 0;
  flex-direction: column;
  transition: right 0.6s cubic-bezier(0.19, 1, 0.22, 1);
`;

const MenuClose = styled.div`
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 0.45rem;
  z-index: 2;
`;

const CloseIcon = styled(Close)`
`;


interface SlideOutMenuProps {
  onClick(): void;
  onClose(): void;
  open?: boolean;
  children?: any;
}

const SlideOutMenu: React.FC<SlideOutMenuProps> = props => {
  return (
    <ClickOutside handleClickOutside={props.onClose}>
      <Wrapper open={props.open}>
        <MenuClose onClick={props.onClick}>
          <CloseIcon size='20' />
        </MenuClose>
        {props.children}
      </Wrapper>
    </ClickOutside>
  );
};

export default SlideOutMenu;
