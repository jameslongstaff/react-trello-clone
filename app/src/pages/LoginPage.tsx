import React from "react";
import BackgroundLayer from "../common/components/BackgroundLayer/BackgroundLayer";
import styled from "styled-components";
import Login from "../features/Auth/Login";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  position: relative;
  text-align: center;
  z-index: 1;
`;

const LoginPage: React.FC<any> = (props: any) => {

  return (
    <React.Fragment>
      <BackgroundLayer colour='#026aa7' />
      <Wrapper>
        <Login />
      </Wrapper>
    </React.Fragment>
  );
};

export default LoginPage;
