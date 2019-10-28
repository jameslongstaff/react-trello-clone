import React from "react";

import styled from "styled-components";
import ListTitle from "./ListTitle";

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const Left = styled.div`
  position: relative;
  width: 100%;
  padding: 0.5rem;
`;

const TaskListHeader: React.FC<any> = (props: any) => {
  return (
    <Wrapper>
      <Left>
        <ListTitle taskListId={props.taskListId} />
      </Left>
    </Wrapper>
  );
};

export default TaskListHeader;
