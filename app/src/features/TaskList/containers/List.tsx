import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import styled from "styled-components";
import ListHeader from "../components/ListHeader";
import CardCreator from "../components/CardCreator";
import ListCards from "../components/ListCards";
import { Draggable } from "react-beautiful-dnd";

//components

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  margin: 0 0.5rem 0 0;
  min-width: 16rem;
`;

const ListContainer = styled.div`
  align-self: flex-start;
  background: #ebecf0;
  border-radius: 3px;
  border: solid 1px #ccc;
  width: 100%;
  position: relative;
`;

const PaddedContainer = styled.div`
  padding: 0.5rem;
`;

interface ListProps {
  index: number;
  id: string;
  taskList: any;
  cards: any[];
}

interface ListState { }

class List extends Component<ListProps, ListState> {

  render() {
    return (
      <Draggable
        draggableId={this.props.id}
        disableInteractiveElementBlocking
        index={this.props.index}
      >
        {provided => (
          <Wrapper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <ListContainer>
              <ListHeader listId={this.props.id} />
              <PaddedContainer>
                <ListCards listId={this.props.id} cards={this.props.cards} />
                <CardCreator taskListId={this.props.id}>Add a task</CardCreator>
              </PaddedContainer>
            </ListContainer>
          </Wrapper>
        )}
      </Draggable>
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
)(List);
