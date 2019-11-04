import React from "react";
import styled from "styled-components";
import BoardTitle from "./BoardTitle";
import { rgba } from 'polished';
import { Menu } from 'styled-icons/material/Menu';
import { useDispatch } from 'react-redux'
import { toggleBoardMenu } from "../../../store/actionCreators/board";

const Wrapper = styled.div`
  background: none;
  border: none;
  margin: 0.5rem;
  position: relative;
  display: flex;
  align-items: flex-end;
`;

const MenuIcon = styled(Menu)`
  color: #fff;
`;

const MenuButton = styled.a`
  background-color: ${rgba('#fff', 0.15)};
  border-radius: 3px;
  cursor: pointer;
  display: inline-flex;
  font-size: 0.8rem;
  padding: 0.4rem 0.5rem;
  width: 8rem;

  &:hover {
    background-color: ${rgba('#fff', 0.2)};
  }

  span {
    color: #fff;
    display: block;
    text-align:center;
    width: 100%;
  }
`;

interface IBoardHeaderProps {
  boardId: string;
}

const BoardHeader: React.FC<IBoardHeaderProps> = props => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <BoardTitle boardId={props.boardId} />
      <MenuButton onClick={() => dispatch(toggleBoardMenu())}>
        <MenuIcon size='20' /><span>Show Menu</span>
      </MenuButton>
    </Wrapper>
  );
};

export default BoardHeader;
