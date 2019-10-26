import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import cuid from "cuid";

import { PlusSquare } from "styled-icons/boxicons-solid/";
import ClickOutside from "../../../common/components/ClickOutside/ClickOutside";
import Button from "../../../common/components/Button/Button";
import { createTask } from "../../../store/actionCreators/task";

const Wrapper = styled.div`
  text-align: right;
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

class TaskListTaskCreator extends Component<any, any> {
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
      <div onClick={this.props.onClick}>
        <div>
          <TextArea
            placeholder="Title.."
            onChange={event => this.handleChange(event)}
            onKeyPress={event => this.handleKeyPress(event)}
            ref={this.input}
          />
        </div>
      </div>
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

export default connect()(TaskListTaskCreator);
