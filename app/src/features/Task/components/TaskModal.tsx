import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Modal } from "reactstrap";
import styled from "styled-components";
import TaskModalTitle from "./TaskModalTitle";
import TaskModalDescriptionEditor from "./TaskModalDescriptionEditor";
import TaskModalSidebar from "./TaskModalSidebar";
import { hideTaskModal } from "../../../store/actionCreators/board";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  top: 0;
  position: fixed;
  overflow: scroll;
  z-index: 3;
`;

const ModalContainer = styled.div`
  min-height: 13.75rem;
`;

const SectionHeader = styled.h5`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const ModalHeader = styled.div`
  margin-bottom: 1rem;
`;

interface TaskModalState {
  newTitle: string;
  originalTitle: string;
  newContent: string;
  originalContent: string;
}

class TaskModal extends Component<any, TaskModalState> {
  private wrapper: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      newTitle: this.props.task.title,
      originalTitle: this.props.task.title,
      newContent: this.props.task.content,
      originalContent: this.props.task.content
    };

    this.wrapper = React.createRef();
  }

  render() {
    return (
      <Wrapper>
        <Modal hideHandler={this.props.handleHideTaskModal} show>
          <ModalContainer ref={this.wrapper}>
            <Container fluid>
              <Row>
                <Col>
                  <ModalHeader>
                    <TaskModalTitle taskId={this.props.taskId} />
                  </ModalHeader>
                </Col>
              </Row>
              <Row>
                <Col xs="9">
                  <SectionHeader>Description</SectionHeader>
                  <TaskModalDescriptionEditor taskId={this.props.taskId} />
                </Col>
                <Col xs="3">
                  <SectionHeader>Actions</SectionHeader>
                  <TaskModalSidebar taskId={this.props.taskId} />
                </Col>
              </Row>
            </Container>
          </ModalContainer>
        </Modal>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    task: state.cards.byId[ownProps.cardId]
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    handleHideTaskModal: () => {
      dispatch(hideTaskModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModal);
