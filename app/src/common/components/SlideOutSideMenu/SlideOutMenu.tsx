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
`;

const MenuClose = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.45rem;
`;

const CloseIcon = styled(Close)`
`;


interface SlideOutMenuProps {
  onClose(): void;
  open?: boolean;
  children?: any;
}

const SlideOutMenu: React.FC<SlideOutMenuProps> = props => {
  return (
    <ClickOutside handleClickOutside={props.onClose}>
      <Wrapper open={props.open}>
        <MenuClose>
          <CloseIcon size='20' />
        </MenuClose>
        {props.children}
      </Wrapper>
    </ClickOutside>
  );
};

export default SlideOutMenu;
