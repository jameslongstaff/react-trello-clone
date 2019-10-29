import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import Backdrop from "../../../common/components/Backdrop/Backdrop";
import { showTaskModal } from "../../../store/actionCreators/board";
import Button from "../../../common/components/Button/Button";
import {
  updateCard,
  cloneTask,
  deleteCard,
} from "../../../store/actionCreators/card";
import { rgba } from 'polished'

const Modal = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 3;
  height: 6rem;
  background-color: #fff;
  border-radius: 5px;
`;

const QuickLinks = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  width: 7rem;
  margin-left: 0.25rem;

  Button {
    background: ${rgba('#000', 0.6)};
    color: #fff;
    font-size: 0.8rem;
    font-weight: 400;
    margin-bottom: 0.25rem;
    box-shadow: none;
    text-align: left;
    width: auto;
    padding: 0.4rem 0.6rem;
  }
`;

const ModalContent = styled.div`
  position: relative;
  top: 0;
  z-index: 2;
`;

const TextArea = styled.textarea`
  display: block;
  font-size: 0.8rem;
  border-radius: 3px;
  padding: 0.5rem 0.5rem;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 1px 0 0 #ddd;
  position: relative;
  border: none;
  min-height: 5rem;
  resize: none;
  margin-bottom: 0.25rem;
`;

const ButtonContainer = styled.div`
  float: right;
  margin-top: 0.2rem;
`;

class CardEditModal extends Component<any, any> {
  private input: React.RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);
    this.input = React.createRef();

    this.state = {
      newTitle: this.props.title,
      originalTitle: this.props.title
    };
  }

  componentDidMount() {
    if (!!this.input && !!this.input.current) {
      this.input.current.focus();
      this.input.current.select();
    }
  }

  handleKeyPress = (event: React.KeyboardEvent) => {
    if (this.state.isEditing) {
      if (event.key === "Enter") {
        // let title =
        //   this.state.newTitle === ""
        //     ? this.state.originalTitle
        //     : this.state.newTitle;

        this.handleSaveTitle();
        this.props.onHide();
      }
    }
  };

  handleChangeTitle = (event: any) => {
    this.setState({ newTitle: event.target.value });
  };

  handleSaveTitle = () => {
    if (this.state.newTitle !== this.state.originalTitle) {
      if (this.state.newTitle !== "") {
        const { cardId } = this.props;
        this.props.dispatch(updateCard({ cardId, title: this.state.newTitle }));
        this.setState({ originalTitle: this.state.newTitle });
      } else {
        this.setState({ newTitle: this.state.originalTitle });
      }
    }

    this.props.onHide();
  };

  handleCloneTask = () => {
    const { cardId } = this.props;
    this.props.dispatch(cloneTask({ cardId }));
    this.props.onHide();
  };

  handleDeleteCard = () => {
    const { cardId, card } = this.props;
    this.props.dispatch(deleteCard({ cardId, listId: card.listId }));
    this.props.onHide();
  };

  handleHideModal = () => {
    this.handleSaveTitle();
    // this.props.onHide();
  };

  render() {
    return (
      <Modal>
        <Backdrop onClick={this.handleHideModal} />
        <ModalContent>
          <div>
            <TextArea
              ref={this.input}
              onChange={event => {
                this.handleChangeTitle(event);
              }}
              onKeyPress={event => {
                this.handleKeyPress(event);
              }}
              defaultValue={this.props.title}
            />
            <ButtonContainer>
              <Button small primary onClick={() => this.handleSaveTitle()}>
                <span>Save</span>
              </Button>
            </ButtonContainer>
          </div>
          <QuickLinks>
            <Button small onClick={() => { this.handleCloneTask(); }}>
              <span>Clone card</span>
            </Button>
            <Button small onClick={() => { this.handleDeleteCard(); }}>
              <span>Delete card</span>
            </Button>
          </QuickLinks>
        </ModalContent>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    modal: state.boards.modalState,
    card: state.cards.byId[ownProps.cardId]
  };
};

export default connect(
  mapStateToProps,
  null
)(CardEditModal);
