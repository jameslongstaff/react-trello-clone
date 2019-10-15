import React, { Component } from "react";
import { connect } from "react-redux";
import { updateBoardTitle } from "store/Board/actionCreators";
import styled from "styled-components";

//common components
import EditableTitle from "app/common/components/EditableTitle/EditableTitle";

const Wrapper = styled.div`
  display: inline-block;
`;

class BoardTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: this.props.board.title,
      originalTitle: this.props.board.title
    };
  }

  handleChangeTitle = event => {
    this.setState({ newTitle: event.target.value });
  };

  handleSaveTitle = () => {
    if (this.state.newTitle !== this.state.originalTitle) {
      if (this.state.newTitle !== "") {
        this.props.onSaveTitle(this.state.newTitle);
        this.setState({ originalTitle: this.state.newTitle });
      } else {
        this.setState({ newTitle: this.state.originalTitle });
      }
    }
  };

  render() {
    return (
      <Wrapper>
        <EditableTitle
          title={this.state.newTitle}
          onChange={this.handleChangeTitle}
          onSave={this.handleSaveTitle}
          tag="h1"
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    board: state.boards.byId[ownProps.boardId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSaveTitle: title => {
      dispatch(updateBoardTitle({ boardId: ownProps.boardId, title: title }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardTitle);
