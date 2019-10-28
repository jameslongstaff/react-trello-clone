import React, { Component } from "react";
import { connect } from "react-redux";
import EditableTitle from "../../../common/components/EditableTitle/EditableTitle";
import { updateCard } from "../../../store/actionCreators/card";

//common components

class TaskModalTitle extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      newTitle: this.props.card.title,
      originalTitle: this.props.card.title
    };
  }

  handleChangeTitle = (event: any) => {
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
      <EditableTitle
        title={this.state.newTitle}
        onChange={this.handleChangeTitle}
        onSave={this.handleSaveTitle}
        tag="h5"
      />
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
    onSaveTitle: (title: string) => {
      dispatch(updateCard({ cardId: ownProps.cardId, title: title }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModalTitle);
