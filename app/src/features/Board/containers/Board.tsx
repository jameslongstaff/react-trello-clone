import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";

//components
import BoardTitleBar from "../components/BoardTitleBar";
import TaskList from "../../TaskList/containers/TaskList";
import TaskModal from "../../Task/components/TaskModal";
import { updateListOrder } from "../../../store/actionCreators/list";
import { fetchBoard } from "../../../store/actionCreators/board";
import Spinner from "../../../common/components/Spinner/Spinner";
import ListCreator from "../components/ListCreator";

const Wrapper = styled.div`

`;

const ListsHolder = styled.div`
  margin: 0.5rem;
`;

class Board extends Component<any, any> {
  async componentDidMount() {
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
      updateListOrder({
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
            <BoardTitleBar boardId={this.props.id} />
            <ListsHolder>
              {this.props.lists.length > 0 && (
                <DragDropContext onDragEnd={this.handleDragEnd}>
                  {this.props.lists.map((taskListId: string, index: number) => {
                    return <TaskList key={taskListId} id={taskListId} />;
                  })}
                </DragDropContext>
              )}
              <ListCreator boardId={this.props.id}></ListCreator>
            </ListsHolder>
          </Wrapper>
        )}
        {!this.props.loading && this.props.modalState.taskModalIsVisible && (
          <TaskModal cardId={this.props.modalState.taskModalId} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    modalState: state.boards.modalState,
    board: state.boards.board,
    lists: state.lists.allIds,
    loading: state.boards.loading
  };
};

export default connect(mapStateToProps)(Board);
