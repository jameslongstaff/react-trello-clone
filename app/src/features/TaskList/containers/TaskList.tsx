import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import TaskListHeader from "../components/TaskListHeader";
import Task from "../../Task/containers/Task";
import TaskListTaskCreator from "../components/TaskListTaskCreator";

//components

const Column = styled.div`
  float: left;
  margin: 0 0.5rem 0 0;
  width: 16rem;
`;

const List = styled.div`
  background: #ebecf0;
  border-radius: 3px;
  border: solid 1px #ccc;
  width: 100%;
  position: relative;
`;

const PaddedContainer = styled.div`
  padding: 0.5rem;
`;


interface TaskListProps {
  id: string;
  taskList: any;
  cards: any[];
}

interface TaskListState { }

class TaskList extends Component<TaskListProps, TaskListState> {
  render() {
    return (
      <Droppable droppableId={this.props.id}>
        {(provided, snapshot) => (
          <Column {...provided.droppableProps}>
            <List>
              <TaskListHeader taskListId={this.props.id} />
              <PaddedContainer>
                <div ref={provided.innerRef}>
                  {this.props.cards.map((card, index) => {
                    return (
                      <Task
                        id={card._id}
                        key={card._id}
                        index={index}
                        title={card.title}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
                <TaskListTaskCreator taskListId={this.props.id}>
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    list: state.lists.byId[ownProps.id],
    cards: state.lists.byId[ownProps.id].cards.map(
      (cardId: string) => state.cards.byId[cardId]
    )
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
