import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: #2d2c2c;
  display: flex;
  height: 100vh;
  width: 20rem;
  position: fixed;
  right: ${(props: SlideOutSideMenuProps) => props.open ? 0 : '-20rem'}
  padding: 5.5rem 0 0 0;
`;

interface SlideOutSideMenuProps {
  open: boolean;
}

const SlideOutSideMenu: React.FC<SlideOutSideMenuProps> = props => {
  return (
    <Wrapper open={props.open}>

    </Wrapper>
  );
};

export default SlideOutSideMenu;
