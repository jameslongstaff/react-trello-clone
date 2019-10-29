import React from "react";

import styled from "styled-components";
import ListTitle from "./ListTitle";
import { DotsHorizontalRounded } from "styled-icons/boxicons-regular/";

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const Left = styled.div`
  position: relative;
  width: 100%;
  padding: 0.5rem;
`;

const ListMenuToggle = styled.a`
  height: 1.25rem;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  display: block;
  width: 1.25rem;
  right: 0.5rem;
`;

const DotsIcon = styled(DotsHorizontalRounded)`
  color: #777;
  height: 1.25rem;
  position: absolute;
  top: 0;
  right: 0;
`;

const ListHeader: React.FC<any> = (props: any) => {
  return (
    <Wrapper>
      <Left>
        <ListTitle taskListId={props.taskListId} />
        <ListMenuToggle>
          <DotsIcon></DotsIcon>
        </ListMenuToggle>
      </Left>
    </Wrapper>
  );
};

export default ListHeader;
