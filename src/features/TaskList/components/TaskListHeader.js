import React from "react";
import TaskListTitle from "features/TaskList/components/TaskListTitle";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const Left = styled.div`
  position: relative;
  width: 100%;
  padding: 0.5rem;
`;

const TaskListHeader = props => {
  return (
    <Wrapper>
      <Left>
        <TaskListTitle taskListId={props.taskListId} />
      </Left>
    </Wrapper>
  );
};

export default TaskListHeader;
