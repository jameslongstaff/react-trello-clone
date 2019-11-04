//TODO: Modal to be refactored, stripping out reactstrap in favour of flex styled components.
import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";
import CardModalTitle from "./CardModalTitle";
import CardModalDescriptionEditor from "./CardModalDescriptionEditor";
import CardModalSidebar from "./CardModalSidebar";
import { hideTaskModal } from "../../../store/actionCreators/board";
import Modal from "../../../common/components/Modal/Modal";

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

interface CardModalState {
  newTitle: string;
  originalTitle: string;
  newContent: string;
  originalContent: string;
}

class CardModal extends Component<any, CardModalState> {
  private wrapper: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      newTitle: this.props.card.title,
      originalTitle: this.props.card.title,
      newContent: this.props.card.content,
      originalContent: this.props.card.content
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
                    <CardModalTitle cardId={this.props.cardId} />
                  </ModalHeader>
                </Col>
              </Row>
              <Row>
                <Col xs="9">
                  <SectionHeader>Description</SectionHeader>
                  <CardModalDescriptionEditor cardId={this.props.cardId} />
                </Col>
                <Col xs="3">
                  <SectionHeader>Actions</SectionHeader>
                  <CardModalSidebar cardId={this.props.cardId} />
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
    card: state.cards.byId[ownProps.cardId]
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
)(CardModal);
