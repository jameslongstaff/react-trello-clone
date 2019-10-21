import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";
import Backdrop from "../../../common/components/Backdrop/Backdrop";
import { showTaskModal } from "../../../store/Board/actionCreators";
import {
  updateTaskTitle,
  cloneTask,
  deleteTask
} from "../../../store/Users/actionCreators";
import Button from "../../../common/components/Button/Button";

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

const ButtonContainer = styled.div`
  float: right;
  margin-top: 0.2rem;
`;

class TaskEditModal extends Component<any, any> {
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
        let title =
          this.state.newTitle === ""
            ? this.state.originalTitle
            : this.state.newTitle;

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
    // this.cancelEditMode();
  };

  handleDeleteTask = () => {
    this.props.handleDeleteCard(this.props.id);
    // this.cancelEditMode();
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    modal: state.boards.modalState
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleShowTaskModal: (id: string) => {
      dispatch(showTaskModal({ taskId: id }));
    },
    handleSaveTitle: (title: string, id: string) => {
      dispatch(updateTaskTitle({ taskId: id, title: title }));
    },
    handleCloneTask: (id: string) => {
      dispatch(cloneTask({ taskId: id }));
    },
    handleDeleteTask: (id: string) => {
      dispatch(deleteTask({ taskId: id }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskEditModal);
