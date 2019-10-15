import React, { Component } from "react";
import { connect } from "react-redux";
import { updateListTitle } from "store/TaskList/actionCreators";
import styled from "styled-components";

//common components
import EditableTitle from "app/common/components/EditableTitle/EditableTitle";

const Wrapper = styled.div``;

class TaskListTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: this.props.taskList.title,
      originalTitle: this.props.taskList.title
    };
  }

  handleChangeTitle = event => {
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

const mapStateToProps = (state, ownProps) => {
  return {
    taskList: state.taskLists.byId[ownProps.taskListId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSaveTitle: title => {
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
