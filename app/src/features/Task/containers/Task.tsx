import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import styled from "styled-components";

import { Pencil } from "styled-icons/boxicons-solid";
import {
  deleteTask,
  updateTaskTitle,
  cloneTask
} from "../../../store/Users/actionCreators";
import TaskEditModal from "../components/TaskEditModal";
import { showTaskModal } from "../../../store/Board/actionCreators";

const Card = styled.div`
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

interface TaskState {
  isEditing: boolean;
}

class Task extends Component<any, TaskState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  handleClick = () => {
    this.initEditMode();
  };

  initEditMode = () => {
    if (!this.state.isEditing) {
      this.setState({ isEditing: true }, () => {});
    }
  };

  cancelEditMode = () => {
    this.setState({ isEditing: false });
  };

  render() {
    return (
      <Draggable
        isDragDisabled={this.state.isEditing}
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
            <Card onClick={() => this.props.handleShowTaskModal(this.props.id)}>
              <CardContent>
                <CardTitle>{this.props.title}</CardTitle>
                <QuickEditButton onClick={this.initEditMode}>
                  <StyledPencil size="18" title="" />
                </QuickEditButton>
              </CardContent>
            </Card>
            {this.state.isEditing ? (
              <TaskEditModal
                title={this.props.title}
                taskId={this.props.id}
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
    task: state.tasks.byId[ownProps.id]
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
)(Task);
