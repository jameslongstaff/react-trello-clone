import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { PlusSquare } from "styled-icons/boxicons-solid/";
import ClickOutside from "../../../common/components/ClickOutside/ClickOutside";
import Button from "../../../common/components/Button/Button";
import { createTask } from "../../../store/actionCreators/card";

const Wrapper = styled.div`
  align-self: flex-start;
  display: flex;
  flex-flow: row wrap;
`;

const TextAreaContainer = styled.div`
  flex: 0 0 100%;
`;

const TextArea = styled.textarea`
  border-radius: 3px;
  background: #fff;
  border: solid 1px #efefef;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 1px 0 0 #ddd;
  height: 100%;
  border: none;
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
  font-size: 0.8rem;
  width: 100%;
  resize: none;

  &:focus {
    outline: none;
  }
`;

class CardCreator extends Component<any, any> {
  private input: React.RefObject<HTMLTextAreaElement>;

  constructor(props: any) {
    super(props);
    this.input = React.createRef();
  }

  state = {
    editorIsOpen: false,
    title: ""
  };

  handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      this.saveTask();
    }
  };

  openEditor = () => {
    this.setState({ editorIsOpen: true, title: "" }, () => {
      if (!!this.input && this.input.current) {
        this.input.current.focus();
      }
    });
  };

  closeEditor = () => {
    this.setState({ editorIsOpen: false });
  };

  handleClickOutside = () => {
    if (this.state.editorIsOpen) {
      this.saveTask();
    }
  };

  saveTask = () => {
    if (this.state.title !== "") {
      this.props.dispatch(
        createTask({
          title: this.state.title,
          listId: this.props.taskListId
        })
      );
    }

    this.closeEditor();
  };

  handleChange = (event: any) => {
    this.setState({ title: event.target.value });
  };

  render() {
    let editor = this.state.editorIsOpen ? (
      <TextAreaContainer onClick={this.props.onClick}>
        <TextArea
          placeholder="Title.."
          onChange={event => this.handleChange(event)}
          onKeyPress={event => this.handleKeyPress(event)}
          ref={this.input}
        />
      </TextAreaContainer>
    ) : null;

    return (
      <ClickOutside handleClickOutside={this.handleClickOutside}>
        <Wrapper>
          {editor}
          <Button
            primary={this.state.title !== "" && this.state.editorIsOpen}
            onClick={this.state.editorIsOpen ? this.saveTask : this.openEditor}
          >
            <PlusSquare size="20" />
          </Button>
        </Wrapper>
      </ClickOutside>
    );
  }
}

export default connect()(CardCreator);
