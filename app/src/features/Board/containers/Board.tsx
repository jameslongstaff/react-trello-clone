import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

//components
import BoardTitleBar from "../components/BoardTitleBar";
import CardModal from "../../Task/components/CardModal";
import { updateListOrder, updateCardOrder } from "../../../store/actionCreators/list";
import { fetchBoard } from "../../../store/actionCreators/board";
import Spinner from "../../../common/components/Spinner/Spinner";
import ListCreator from "../components/ListCreator";
import ListScroller from "../components/ListScroller";
import Lists from "../components/Lists";
import BoardSideMenu from "../components/BoardSideMenu";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`;

const ListsContainer = styled.div`
  position: relative;
  display: flex;
  flex-basis: 100%;
`;

class Board extends Component<any, any> {

  async componentDidMount() {
    const { id } = this.props;
    this.props.dispatch(fetchBoard({ boardId: id }));
  }

  handleDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'lists') {
      this.props.dispatch(
        updateListOrder({
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          boardId: this.props.id,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        })
      );
    }

    if (type === 'cards') {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      this.props.dispatch(
        updateCardOrder({
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          sourceIndex: source.index,
          destinationIndex: destination.index
        })
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          {this.props.loading && <Spinner></Spinner>}
          {!this.props.loading && (
            <Droppable droppableId={this.props.id} direction="horizontal" type="lists">
              {(provided, snapshot) => (
                <Wrapper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <BoardTitleBar boardId={this.props.id} />
                  <ListScroller>
                    <ListsContainer onMouseDown={(e) => { e.stopPropagation() }}>
                      <Lists lists={this.props.lists}></Lists>
                      <ListCreator boardId={this.props.id}></ListCreator>
                    </ListsContainer>
                  </ListScroller>
                  {provided.placeholder}
                  <BoardSideMenu open={this.props.boards.menuOpen} />
                </Wrapper>
              )}
            </Droppable>
          )}
          {!this.props.loading && this.props.modalState.taskModalIsVisible && (
            <CardModal cardId={this.props.modalState.taskModalId} />
          )}
        </DragDropContext>
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    modalState: state.boards.modalState,
    board: state.boards.board,
    lists: state.lists.allIds,
    loading: state.boards.loading,
    boards: state.boards, // currently using to test slideoutmenu state - will separate ui state at a later date
  };
};

export default connect(mapStateToProps)(Board);
