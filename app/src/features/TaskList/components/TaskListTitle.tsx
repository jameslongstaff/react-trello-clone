import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import EditableTitle from "../../../common/components/EditableTitle/EditableTitle";
import { updateListTitle } from "../../../store/TaskList/actionCreators";

//common components

const Wrapper = styled.div``;

interface TaskListStateProps {
  newTitle: string;
  originalTitle: string;
}

interface TaskListTitleProps {
  taskList: any;
  onSaveTitle(newTitle: string): void;
}

class TaskListTitle extends Component<TaskListTitleProps, TaskListStateProps> {
  constructor(props: TaskListTitleProps) {
    super(props);
    this.state = {
      newTitle: this.props.taskList.title,
      originalTitle: this.props.taskList.title
    };
  }

  handleChangeTitle = (event: any) => {
    this.setState({ newTitle: event.target.value });
  };

  handleSaveTitle = () => {
    if (this.state.newTitle !== this.state.originalTitle) {
      if (this.state.newTitle !== "") {
        this.props.onSaveTitle(this.state.newTitle);
        this.setState({ originalTitle: this.state.newTitle });
      } else {
        this.setState({ newTitle: this.state.originalTitle });
      }
    }
  };

  render() {
    return (
      <Wrapper>
        <EditableTitle
          title={this.state.newTitle}
          onChange={this.handleChangeTitle}
          onSave={this.handleSaveTitle}
          tag="h6"
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    taskList: state.taskLists.byId[ownProps.taskListId]
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    onSaveTitle: (title: string) => {
      dispatch(
        updateListTitle({ taskListId: ownProps.taskListId, title: title })
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListTitle);
