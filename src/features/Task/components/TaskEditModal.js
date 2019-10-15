import React, { Component } from "react";
import { connect } from "react-redux";
import Backdrop from "app/common/components/Backdrop/Backdrop";
import Button from "app/common/components/Button/Button";
import styled from "styled-components";

import * as taskActions from "store/Task/actionCreators";
import * as boardActions from "store/Board/actionCreators";

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

const ModalContent = styled.div`
  position: relative;
  top: -3px;
  z-index: 2;
`;

const TextArea = styled.textarea`
  display: block;
  font-size: 0.8rem;
  border-radius: 3px 3px 0 0;
  padding: 0.5rem 0.5rem;
  background-color: none;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 1px 0 0 #ddd;
  position: relative;
  border: none;
  min-height: 4rem;
  resize: none;
`;

const TimingButtonText = styled.span`
  line-height: 1.25em;
  display: inline;
  font-size: 0.8rem;
  margin-left: 0.125rem;
`;

const ButtonContainer = styled.div`
  float: right;
  margin-top: 0.2rem;
`;

class TaskEditModal extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();

    this.state = {
      newTitle: this.props.title,
      originalTitle: this.props.title
    };
  }

  componentDidMount() {
    this.input.current.focus();
    this.input.current.select();
  }

  handleKeyPress = event => {
    if (this.state.isEditing) {
      if (event.key === "Enter") {
        let title =
          this.state.newTitle === ""
            ? this.state.originalTitle
            : this.state.newTitle;

        this.handleSaveTitle(title, this.props.id);
        this.props.onHide();
      }
    }
  };

  handleChangeTitle = event => {
    this.setState({ newTitle: event.target.value });
  };

  handleSaveTitle = () => {
    if (this.state.newTitle !== this.state.originalTitle) {
      if (this.state.newTitle !== "") {
        this.props.handleSaveTitle(this.state.newTitle, this.props.taskId);
        this.setState({ originalTitle: this.state.newTitle });
      } else {
        this.setState({ newTitle: this.state.originalTitle });
      }
    }

    this.props.onHide();
  };

  handleCloneTask = () => {
    this.props.handleCloneTask(this.props.id);
    this.cancelEditMode();
  };

  handleDeleteTask = () => {
    this.props.handleDeleteCard(this.props.id);
    this.cancelEditMode();
  };

  handleHideModal = () => {
    this.handleSaveTitle();
    this.props.onHide();
  };

  render() {
    return (
      <Modal>
        <Backdrop show onClick={this.handleHideModal} />
        <ModalContent>
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
              Save
            </Button>
          </ButtonContainer>
          {/* <Button color="#5aac44" onClick={() => this.handleSaveTitle()}>
            Save
          </Button> */}
          {/* <div>
            <button
              onClick={() => {
                this.handleCloneTask();
              }}
            >
              Clone task
            </button>
            <button
              onClick={() => {
                this.handleDeleteTask();
              }}
            >
              Delete task
            </button>
          </div> */}
        </ModalContent>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    modal: state.boards.modalState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleShowTaskModal: id => {
      dispatch(boardActions.showTaskModal({ taskId: id }));
    },
    handleSaveTitle: (title, id) => {
      dispatch(taskActions.updateTaskTitle({ taskId: id, title: title }));
    },
    handleCloneTask: id => {
      dispatch(taskActions.cloneTask({ taskId: id }));
    },
    handleDeleteTask: id => {
      dispatch(taskActions.deleteTask({ taskId: id }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskEditModal);
