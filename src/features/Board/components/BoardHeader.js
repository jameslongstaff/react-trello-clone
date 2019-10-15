import React from "react";
import BoardTitle from "features/Board/components/BoardTitle";
import styled from "styled-components";

const Wrapper = styled.div`
  background: none;
  border: none;
  margin-bottom: 0.25rem;
  position: relative;
  display: flex;
`;

const BoardHeader = props => {
  return (
    <Wrapper>
      <BoardTitle boardId={props.boardId} />
    </Wrapper>
  );
};

export default BoardHeader;
