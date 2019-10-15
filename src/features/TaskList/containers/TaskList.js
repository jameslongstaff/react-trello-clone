import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

//components
import TaskListHeader from "features/TaskList/components/TaskListHeader";
import Task from "features/Task/containers/Task";
import TaskListTaskCreator from "features/TaskList/components/TaskListTaskCreator";

const Column = styled.div`
  float: left;
  margin: 0 1rem 0 0;
  width: 16rem;
`;

const List = styled.div`
  background: #efefef;
  border-radius: 3px;
  border: solid 1px #ccc;
  width: 100%;
  position: relative;
`;

const PaddedContainer = styled.div`
  padding: 0.5rem;
`;

class TaskList extends Component {
  render() {
    return (
      <Droppable droppableId={this.props.id.toString()}>
        {(provided, snapshot) => (
          <Column {...provided.droppableProps}>
            <List>
              <TaskListHeader taskListId={this.props.taskList.id} />
              <PaddedContainer>
                <div ref={provided.innerRef}>
                  {this.props.tasks.map((task, index) => {
                    return (
                      <Task
                        id={task.id}
                        key={task.id}
                        index={index}
                        title={task.title}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
                <TaskListTaskCreator taskListId={this.props.taskList.id}>
                  Add a task
                </TaskListTaskCreator>
              </PaddedContainer>
            </List>
          </Column>
        )}
      </Droppable>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    taskList: state.taskLists.byId[ownProps.id],
    tasks: state.taskLists.byId[ownProps.id].tasks.map(taskId => {
      return state.tasks.byId[taskId];
    })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
