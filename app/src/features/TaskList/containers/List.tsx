import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import ListHeader from "../components/ListHeader";
import Card from "../../Task/containers/Card";
import CardCreator from "../components/CardCreator";

//components

const Column = styled.div`
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
  id: string;
  taskList: any;
  cards: any[];
}

interface ListState { }

class List extends Component<ListProps, ListState> {
  render() {
    return (
      <Droppable droppableId={this.props.id}>
        {(provided, snapshot) => (
          <Column {...provided.droppableProps}>
            <ListContainer>
              <ListHeader listId={this.props.id} />
              <PaddedContainer>
                <div ref={provided.innerRef}>
                  {this.props.cards.map((card, index) => {
                    return (
                      <Card
                        id={card.id}
                        key={card.id}
                        index={index}
                        title={card.title}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
                <CardCreator taskListId={this.props.id}>
                  Add a task
                </CardCreator>
              </PaddedContainer>
            </ListContainer>
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
)(List);
