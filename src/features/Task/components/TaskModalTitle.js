import React, { Component } from "react";
import { connect } from "react-redux";
import * as taskActions from "store/Task/actionCreators";

//common components
import EditableTitle from "app/common/components/EditableTitle/EditableTitle";

class TaskModalTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: this.props.task.title,
      originalTitle: this.props.task.title
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
      <EditableTitle
        title={this.state.newTitle}
        onChange={this.handleChangeTitle}
        onSave={this.handleSaveTitle}
        tag="h5"
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.tasks.byId[ownProps.taskId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSaveTitle: title => {
      dispatch(
        taskActions.updateTaskTitle({ taskId: ownProps.taskId, title: title })
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModalTitle);
