import React from "react";
import BackgroundLayer from "../common/components/BackgroundLayer/BackgroundLayer";
import Board from "../features/Board/containers/Board";

const BoardPage: React.FC<any> = (props: any) => {
  const { boardId } = props.match.params;

  return (
    <React.Fragment>
      <BackgroundLayer />
      <Board id={boardId} />;
    </React.Fragment>
  );
};

export default BoardPage;
