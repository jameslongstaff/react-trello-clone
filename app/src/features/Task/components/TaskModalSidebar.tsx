import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import VerticalMenu from "../../../common/components/VerticalMenu/VerticalMenu";
import Button from "../../../common/components/Button/Button";
import { cloneCard, deleteCard } from "../../../store/actionCreators/card";

const ButtonContainer = styled.div`
  margin-bottom: 0.25rem;
`;

class TaskModalSidebar extends Component<any> {
  render() {
    return (
      <VerticalMenu>
        <ButtonContainer>
          <Button onClick={() => this.handleCloneCard()}>
            <span>Clone task</span>
          </Button>
          <Button onClick={() => this.handleDeleteTask()}>
            <span>Delete task</span>
          </Button>
        </ButtonContainer>
      </VerticalMenu>
    );
  }

  handleDeleteTask = () => {
    this.props.handleDeleteTask(this.props.card.id);
    this.props.handleHideTaskModal();
  };

  handleCloneCard = () => {
    this.props.handleCloneCard(this.props.card.id);
    this.props.handleHideTaskModal();
  };
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    card: state.cards.byId[ownProps.cardId]
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    handleCloneCard: (id: string) => {
      dispatch(cloneCard({ cardId: id }));
    },
    handleDeleteTask: (id: string) => {
      dispatch(deleteCard({ cardId: id }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModalSidebar);
