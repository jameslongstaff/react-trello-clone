import React, { Component } from "react";
import { connect } from "react-redux";

import VerticalMenu from "app/common/components/VerticalMenu/VerticalMenu";
import Button from "app/common/components/Button/Button";
import * as taskActions from "store/Task/actionCreators";

import styled from "styled-components";

const ButtonContainer = styled.div`
  margin-bottom: 0.25rem;
`;

class TaskModalSidebar extends Component {
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

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.tasks.byId[ownProps.taskId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleCloneTask: id => {
      dispatch(taskActions.cloneTask({ taskId: id }));
    },
    handleDeleteTask: id => {
      dispatch(taskActions.deleteTask({ taskId: id }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModalSidebar);
