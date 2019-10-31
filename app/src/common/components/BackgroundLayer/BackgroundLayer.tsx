import React from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  background: ${(props: IBackgroundLayerProps) => props.colour || '#b04632'};
  background-size: cover;
  height: 100vh;
  width: 100%;
  position: fixed;
`;

interface IBackgroundLayerProps {
  colour?: string;
}

const BackgroundLayer: React.FC<IBackgroundLayerProps> = (props: IBackgroundLayerProps) => {
  return <Wrapper colour={props.colour}>
  </Wrapper>;
};

export default BackgroundLayer;
