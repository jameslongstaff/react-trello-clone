import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import VerticalMenu from "../../../common/components/VerticalMenu/VerticalMenu";
import Button from "../../../common/components/Button/Button";
import { deleteTask, cloneTask } from "../../../store/Users/actionCreators";

const ButtonContainer = styled.div`
  margin-bottom: 0.25rem;
`;

class TaskModalSidebar extends Component<any> {
  render() {
    return (
      <VerticalMenu>
        <ButtonContainer>
          <Button onClick={() => this.handleCloneTask()}>Clone task</Button>
          <ButtonContainer />
          <Button onClick={() => this.handleDeleteTask()}>Delete task</Button>
        </ButtonContainer>
      </VerticalMenu>
    );
  }
}

const handleDeleteTask = () => {
  this.props.handleDeleteTask(this.props.task.id);
  this.props.handleHideTaskModal();
};

const handleCloneTask = () => {
  this.props.handleCloneTask(this.props.task.id);
  this.props.handleHideTaskModal();
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    task: state.tasks.byId[ownProps.taskId]
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    handleCloneTask: (id: string) => {
      dispatch(cloneTask({ taskId: id }));
    },
    handleDeleteTask: (id: string) => {
      dispatch(deleteTask({ taskId: id }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModalSidebar);
