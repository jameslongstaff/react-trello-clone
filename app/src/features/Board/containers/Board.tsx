import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

//components

import BoardHeader from "../components/BoardHeader";
import TaskList from "../../TaskList/containers/TaskList";
import TaskModal from "../../Task/components/TaskModal";
import { updateTaskOrder } from "../../../store/actionCreators/taskList";
import { fetchBoard } from "../../../store/actionCreators/board";
import Spinner from "../../../common/components/Spinner/Spinner";

const Wrapper = styled.div`
  padding: 2rem 0.5rem 0.5rem 0.5rem;
  position: relative;
  z-index: 1;
`;

class Board extends Component<any, any> {
  componentDidMount() {
    const { id } = this.props;
    this.props.dispatch(fetchBoard({ boardId: id }));
  }

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

    this.props.dispatch(
      updateTaskOrder({
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      })
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.props.loading && <Spinner></Spinner>}
        {!this.props.loading && (
          <Wrapper>
            <BoardHeader boardId={this.props.id} />
            <DragDropContext onDragEnd={this.handleDragEnd}>
              {this.props.taskLists.map((taskListId: string, index: number) => {
                return <TaskList key={taskListId} id={taskListId} />;
              })}
            </DragDropContext>
          </Wrapper>
        )}
        {!this.props.loading && this.props.modalState.taskModalIsVisible && (
          <TaskModal taskId={this.props.modalState.taskModalId} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  console.log("msp", state.boards.loading);
  return {
    modalState: state.boards.modalState,
    board: state.boards.byId[ownProps.id],
    taskLists: state.taskLists.allIds,
    loading: state.boards.loading
  };
};

export default connect(mapStateToProps)(Board);
