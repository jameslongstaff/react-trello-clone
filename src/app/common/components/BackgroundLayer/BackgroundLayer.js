import React from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  background: #b04632;
  background-size: cover;
  height: 100vh;
  width: 100%;
  position: fixed;
`;

const BackgroundLayer = props => {
  return <Wrapper />;
};

export default BackgroundLayer;
