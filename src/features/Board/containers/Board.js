import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

//components
import BoardHeader from "features/Board/components/BoardHeader";
import TaskList from "features/TaskList/containers/TaskList";
import TaskModal from "features/Task/components/TaskModal";

import * as taskListActions from "store/TaskList/actionCreators";

const Wrapper = styled.div`
  padding: 2rem 0.5rem 0.5rem 0.5rem;
  position: relative;
  z-index: 1;
`;

class Board extends Component {
  handleDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    this.props.handleChangeTaskOrder(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  render() {
    console.log("modal", this.props.modalState.taskModalIsVisible);
    return (
      <React.Fragment>
        <Wrapper>
          <BoardHeader boardId={this.props.id} />
          <DragDropContext onDragEnd={this.handleDragEnd}>
            {this.props.taskLists.map((taskListId, index) => {
              return <TaskList key={taskListId} id={taskListId} />;
            })}
          </DragDropContext>
        </Wrapper>
        {this.props.modalState.taskModalIsVisible && (
          <TaskModal taskId={this.props.modalState.taskModalId} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modalState: state.boards.modalState,
    board: state.boards.byId[ownProps.id],
    taskLists: state.taskLists.allIds
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChangeTaskOrder: (
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex
    ) => {
      dispatch(
        taskListActions.updateTaskOrder({
          sourceId: sourceId,
          destinationId: destinationId,
          sourceIndex: sourceIndex,
          destinationIndex: destinationIndex
        })
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
