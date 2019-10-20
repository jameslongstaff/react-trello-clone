import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

//components

import BoardHeader from "../components/BoardHeader";
import TaskList from "../../TaskList/containers/TaskList";
import TaskModal from "../../Task/components/TaskModal";
import { updateTaskOrder } from "../../../store/Users/actionCreators";

const Wrapper = styled.div`
  padding: 2rem 0.5rem 0.5rem 0.5rem;
  position: relative;
  z-index: 1;
`;

class Board extends Component<any, any> {
  handleDragEnd = (result: any) => {
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
    return (
      <React.Fragment>
        <Wrapper>
          <BoardHeader boardId={this.props.id} />
          <DragDropContext onDragEnd={this.handleDragEnd}>
            {this.props.taskLists.map((taskListId: string, index: number) => {
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    modalState: state.boards.modalState,
    board: state.boards.byId[ownProps.id],
    taskLists: state.taskLists.allIds
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    handleChangeTaskOrder: (
      sourceId: string,
      destinationId: string,
      sourceIndex: number,
      destinationIndex: number
    ) => {
      dispatch(
        updateTaskOrder({
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
