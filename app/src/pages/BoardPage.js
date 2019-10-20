import React from "react";
import Board from "features/Board/containers/Board";
import BackgroundLayer from "common/components/BackgroundLayer/BackgroundLayer";

const BoardPage = props => {
  const { boardId } = props.match.params;

  return (
    <React.Fragment>
      <BackgroundLayer />
      <Board id={boardId} />;
    </React.Fragment>
  );
};

export default BoardPage;
