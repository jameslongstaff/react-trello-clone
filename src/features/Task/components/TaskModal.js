import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";

import * as boardActions from "store/Board/actionCreators";

import Modal from "app/common/components/Modal/Modal";
import TaskModalSidebar from "features/Task/components/TaskModalSidebar";
import TaskModalTitle from "features/Task/components/TaskModalTitle";
import TaskModalDescriptionEditor from "features/Task/components/TaskModalDescriptionEditor";

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

class TaskModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTitle: this.props.task.title,
      originalTitle: this.props.task.title,
      newContent: this.props.task.content,
      originalContent: this.props.task.content
    };

    this.modal = React.createRef();
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

const mapStateToProps = (state, ownProps) => {
  return {
    task: state.tasks.byId[ownProps.taskId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleHideTaskModal: () => {
      dispatch(boardActions.hideTaskModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModal);
