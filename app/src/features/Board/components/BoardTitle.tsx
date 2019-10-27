import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import EditableTitle from "../../../common/components/EditableTitle/EditableTitle";
import { updateBoardTitle } from "../../../store/actionCreators/board";

//common components

const Wrapper = styled.div`
  display: inline-block;
`;

interface IBoardTitleState {
  newTitle: string;
  originalTitle: string;
}

class BoardTitle extends Component<any, IBoardTitleState> {
  constructor(props: any) {
    super(props);

    this.state = {
      newTitle: this.props.board.title,
      originalTitle: this.props.board.title
    };
  }

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    board: state.boards.board
  };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    onSaveTitle: (title: string) => {
      dispatch(updateBoardTitle({ boardId: ownProps.boardId, title: title }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardTitle);
