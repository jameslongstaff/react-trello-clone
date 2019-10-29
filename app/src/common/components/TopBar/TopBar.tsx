import React from "react";
import styled from "styled-components";
import { rgba } from "polished";

const Wrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  left: 0;
  top: 0;
  background: ${rgba('#fff', 0.1)};
  position: relative;
  z-index: 1;
`;

interface ITopBarProps {

}

const TopBar: React.FC<ITopBarProps> = props => {
  return <Wrapper />;
};

export default TopBar;
