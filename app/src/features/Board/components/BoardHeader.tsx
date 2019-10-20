import React from "react";
import styled from "styled-components";
import BoardTitle from "./BoardTitle";

const Wrapper = styled.div`
  background: none;
  border: none;
  margin-bottom: 0.25rem;
  position: relative;
  display: flex;
`;

interface IBoardHeaderProps {
  boardId: string;
}

const BoardHeader = (props: IBoardHeaderProps) => {
  return (
    <Wrapper>
      <BoardTitle boardId={props.boardId} />
    </Wrapper>
  );
};

export default BoardHeader;
