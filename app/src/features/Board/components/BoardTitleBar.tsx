import React from "react";
import styled from "styled-components";
import BoardTitle from "./BoardTitle";

const Wrapper = styled.div`
  background: none;
  border: none;
  margin: 0.5rem;
  position: relative;
  display: flex;
`;

interface IBoardHeaderProps {
  boardId: string;
}

const BoardHeader: React.FC<IBoardHeaderProps> = props => {
  return (
    <Wrapper>
      <BoardTitle boardId={props.boardId} />

    </Wrapper>
  );
};

export default BoardHeader;
