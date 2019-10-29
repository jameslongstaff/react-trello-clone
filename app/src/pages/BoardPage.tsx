import React from "react";
import BackgroundLayer from "../common/components/BackgroundLayer/BackgroundLayer";
import Board from "../features/Board/containers/Board";
import TopBar from "../common/components/TopBar/TopBar";

const BoardPage: React.FC<any> = (props: any) => {
  const { boardId } = props.match.params;

  return (
    <React.Fragment>
      <BackgroundLayer />
      <TopBar></TopBar>
      <Board id={boardId} />;
    </React.Fragment>
  );
};

export default BoardPage;
