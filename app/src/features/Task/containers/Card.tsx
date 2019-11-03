import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import styled from "styled-components";

import { Pencil } from "styled-icons/boxicons-solid";
import CardEditModal from "../components/CardEditModal";
import { showTaskModal } from "../../../store/actionCreators/board";
import {
  updateCard,
  cloneCard,
  deleteCard,
  cancelQuickEdit,
  beginQuickEdit,
} from "../../../store/actionCreators/card";

const Wrapper = styled.div`
  border-radius: 3px;
  cursor: pointer;
  background-color: #fff;
  border: solid 1px #efefef;
  box-shadow: 0 1px 0 0 #ddd;
  margin-bottom: 0.25rem;
  margin-top: 0.2rem;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    height: 100%;
    width: 0;
    top: 0;
    opacity: 0.5
    background: #eee;
    transition: width 0.25s ease-in-out;
    pointer-events: none;
  }

  &:hover {
    button {
      background: #eee;
      right: 0;
    }
    &:after {
      width: 100%;
    }
  }
`;

const CardHolder = styled.div`
  position: relative;
`;

const CardTitle = styled.p`
  margin: 0;
  font-size: 0.8rem;
`;

const QuickEditButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 0;
  height: 100%;
  width: 2rem;
  right: 0;
  border: none;
  padding: 0 0.25rem;
  right: -2rem;
  transition: right 0.25s ease-in-out;

  &:hover:after {
    color: #888;
  }
`;

const StyledPencil = styled(Pencil)`
  color: #bbb;
`;

const CardContent = styled.div`
  overflow: hidden;
  padding: 0.5rem 2.25rem 0.5rem 0.5rem;
  position: relative;
`;


class Card extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  handleClick = () => {
    this.initEditMode();
  };

  handleQuickEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    this.initEditMode();
  }

  initEditMode = () => {
    if (!this.props.card.isEditing) {
      this.props.beginQuickEdit(this.props.id);
    }
  };

  cancelEditMode = () => {
    this.props.cancelQuickEdit(this.props.id);
  };

  // prevent interference with board scroll when dragging lists and cards
  handleListClick = () => {
    console.log('stop');
    // e.stopPropagation();
  }

  render() {
    return (
      <Draggable
        isDragDisabled={this.props.card.isEditing}
        draggableId={this.props.id}
        index={this.props.index}
        disableInteractiveElementBlocking
      >
        {provided => (
          <CardHolder
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Wrapper onClick={() => this.props.handleShowTaskModal(this.props.id)}>
              <CardContent>
                <CardTitle>{this.props.title}</CardTitle>
                <QuickEditButton onClick={(event) => this.handleQuickEditClick(event)}>
                  <StyledPencil size="18" title="" />
                </QuickEditButton>
              </CardContent>
            </Wrapper>
            {this.props.card.isEditing ? (
              <CardEditModal
                title={this.props.title}
                cardId={this.props.id}
                onHide={this.cancelEditMode}
              />
            ) : null}
          </CardHolder>
        )}
      </Draggable>
    );
  }
}
const mapStateToProps = (state: any, ownProps: any) => {
  return {
    modal: state.boards.modalState,
    card: state.cards.byId[ownProps.id]
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleShowTaskModal: (cardId: string) => {
      dispatch(showTaskModal({ cardId }));
    },
    handleSaveTitle: (title: string, cardId: string) => {
      dispatch(updateCard({ cardId, title: title }));
    },
    handleCloneTask: (id: string) => {
      dispatch(cloneCard({ taskId: id }));
    },
    handleDeleteTask: (id: string) => {
      dispatch(deleteCard({ taskId: id }));
    },
    beginQuickEdit: (cardId: string) => {
      dispatch(beginQuickEdit({ cardId }));
    },
    cancelQuickEdit: (cardId: string) => {
      dispatch(cancelQuickEdit({ cardId }));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card);
