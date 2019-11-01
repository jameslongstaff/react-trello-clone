import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import TopBardLink from "./TopBarLink";
import { Home } from "styled-icons/boxicons-solid/Home";

const Wrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  left: 0;
  top: 0;
  background: ${(props: ITopBarProps) => props.colour ? rgba(props.colour, 0.1) : '#026aa7'};
  position: relative;
  z-index: 1;
  padding: 0.3rem 0.5rem;
`;

const Inner = styled.div`
  margin: 0 auto;
`;

const HomeIcon = styled(Home)`
  color: #fff;
`;


interface ITopBarProps {
  colour?: string;
}

const TopBar: React.FC<ITopBarProps> = props => {
  return (<Wrapper colour={props.colour}>
    <Inner>
      <TopBardLink>
        <HomeIcon size="20"></HomeIcon>
      </TopBardLink>
    </Inner>
  </Wrapper>);
};

export default TopBar;
