import React from "react";
import BackgroundLayer from "../common/components/BackgroundLayer/BackgroundLayer";
import TopBar from "../common/components/TopBar/TopBar";

const LoginPage: React.FC<any> = (props: any) => {

  return (
    <React.Fragment>
      <BackgroundLayer />
      <TopBar colour="#fff"></TopBar>
    </React.Fragment>
  );
};

export default LoginPage;
