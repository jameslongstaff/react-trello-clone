import React from "react";
import BoardTitle from "features/Board/components/BoardTitle";
import styled from "styled-components";
import { ListAlt } from "styled-icons/fa-regular";

const Wrapper = styled.div`
  background: none;
  border: none;
  margin-bottom: 0.25rem;
  position: relative;
  padding-left: 2rem;
  display: flex;
`;

const StyledList = styled(ListAlt)`
  color: #fff;
  display: inline-block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto;
`;

const BoardTotal = styled.span`
  font-size: 1.25rem;
  margin-left: auto;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: #fff;
  line-height: 1.75em;
`;

const BoardHeader = props => {
  return (
    <Wrapper>
      <StyledList size="24" />
      <BoardTitle boardId={props.boardId} />
      <BoardTotal>200</BoardTotal>
    </Wrapper>
  );
};

export default BoardHeader;
