import React from "react";

import styled from "styled-components";
import TaskListTitle from "./TaskListTitle";

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
        <TaskListTitle taskListId={props.taskListId} />
      </Left>
    </Wrapper>
  );
};

export default TaskListHeader;
