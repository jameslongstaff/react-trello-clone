import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

const Wrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  left: 0;
  top: 0;
  background: ${(props: ITopBarProps) => props.colour ? rgba(props.colour, 0.1) : '#026aa7'};
  position: relative;
  z-index: 1;
`;

interface ITopBarProps {
  colour?: string;
}

const TopBar: React.FC<ITopBarProps> = props => {
  return <Wrapper colour={props.colour} />;
};

export default TopBar;
