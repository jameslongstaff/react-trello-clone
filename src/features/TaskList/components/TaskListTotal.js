import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Total = styled.span`
  display: block;
  font-size: 0.9rem;
  border: none;
  font-weight: bold;
  font-family: "Roboto Slab", serif;
  border-radius: 0 0 0 10px;
  top: -1px;
  right: -1px;
  color: #000;
  position: relative;
  bottom: 0;
  height: 1.7rem;
  padding-right: 0.7rem;
  padding-top: 0.5rem;
  text-align: right;
  width: 100%;
`;

class TaskListTotal extends Component {
  render() {
    return <Total>{this.props.total}</Total>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const tasks = state.taskLists.byId[ownProps.taskListId].tasks;

  console.log(tasks);

  return {
    total: tasks.length
      ? tasks
          .map(taskId => {
            const task = state.tasks.byId[taskId];
            return task.consumedPoints > task.estimate
              ? task.consumedPoints
              : task.estimatedPoints;
          })
          .reduce((accumulator, currentValue) => {
            return parseInt(accumulator) + parseInt(currentValue);
          })
      : 0
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskListTotal);
