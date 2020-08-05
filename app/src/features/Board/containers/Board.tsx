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
import BoardMenu from "../components/BoardMenu/BoardMenu";
import { UIState } from "../../../store/reducers/ui";

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

interface Props {
  id: string,
  ui: UIState,
  lists: any,
  boards: any,

  fetchBoard: (params: {}) => any,
  updateListOrder: (params: {}) => any,
  updateCardOrder: (params: {}) => any,
}

class Board extends Component<Props, any> {

  async componentDidMount() {
    const { id } = this.props;
    this.props.fetchBoard({ boardId: id });
  }

  handleDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'lists') {
      this.props.updateListOrder({
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        boardId: this.props.id,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }

    if (type === 'cards') {
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      this.props.updateCardOrder({
        sourceId: source.droppableId,
        destinationId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <DragDropContext onDragEnd={this.handleDragEnd}>
          {this.props.ui.loading && <Spinner></Spinner>}
          {!this.props.ui.loading && (
            <Droppable droppableId={this.props.id} direction="horizontal" type="lists">
              {(provided) => (
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
                  <BoardMenu open={this.props.ui.menuOpen} />
                </Wrapper>
              )}
            </Droppable>
          )}
          {!this.props.ui.loading && this.props.boards.modalState.taskModalIsVisible && (
            <CardModal cardId={this.props.boards.modalState.taskModalId} />
          )}
        </DragDropContext>
      </React.Fragment >
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    boards: state.boards,
    board: state.boards.board,
    lists: state.lists.allIds,
    ui: state.ui,
  };
};

export default connect(mapStateToProps, { updateCardOrder, fetchBoard, updateListOrder })(Board);
