import React from "react";
import BackgroundLayer from "../common/components/BackgroundLayer/BackgroundLayer";
import Board from "../features/Board/containers/Board";
import TopBar from "../common/components/TopBar/TopBar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-direction: column;
  height: 100vh;
`;


const BoardContainer = styled.div`
  background-color: #fff;
  flex: 2;
`;

const BoardPage: React.FC<any> = (props: any) => {
  const { boardId } = props.match.params;

  return (
    <React.Fragment>
      <BackgroundLayer />
      <Wrapper>
        <TopBar colour="#fff"></TopBar>
        <BoardContainer>
          <Board id={boardId} />;
        </BoardContainer>
      </Wrapper>
    </React.Fragment>
  );
};

export default BoardPage;
