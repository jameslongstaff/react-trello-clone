import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import TopBardLink from "./TopBarLink";
import { Home } from "styled-icons/boxicons-solid/Home";

const Wrapper = styled.div`
  display: flex;
  background: ${(props: ITopBarProps) => props.colour ? rgba(props.colour, 0.1) : '#026aa7'};
  position: relative;
  width: 100%;
  padding: 0.1rem 0rem;
  z-index: 1;
`;

const HomeIcon = styled(Home)`
  background-color: ${rgba('#fff', 0.2)};
  border-radius: 3px;
  color: #fff;
  padding: 0.25rem;
  vertical-align: top;

  &:hover {
    background-color: ${rgba('#fff', 0.3)};
  }
`;

interface ITopBarProps {
  colour?: string;
}

const TopBar: React.FC<ITopBarProps> = props => {
  return (
    <Wrapper colour={props.colour}>
      <TopBardLink>
        <HomeIcon size="27"></HomeIcon>
      </TopBardLink>
    </Wrapper>
  );
};

export default TopBar;
