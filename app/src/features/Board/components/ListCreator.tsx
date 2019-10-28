import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import styled from "styled-components";
import ClickOutside from "../../../common/components/ClickOutside/ClickOutside";
import Button from "../../../common/components/Button/Button";
import { createList } from "../../../store/actionCreators/list";
import { rgba } from 'polished'

//components

const Wrapper = styled.div`
  float: left;
  margin: 0 0.5rem 0 0;
  width: 16rem;
  border-radius: 3px;
  position: relative;
  background: ${rgba('#fff', 0.3)};
  padding: 0.4rem;

  &.editing {
    background: #ebecf0;
  }

  input {
    box-shadow: none;
    border-radius: 3px;
    border: none;
    padding: 0.3rem 0.4rem;
    margin-bottom: 0.25rem;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  float: right;
  margin-top: 0.2rem;
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
interface ListCreatorProps { }

interface ListCreatorState { }

class ListCreator extends Component<any, any> {
  private input: React.RefObject<HTMLInputElement>;

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
      this.saveList();
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
      this.saveList();
    }
  };

  handleChange = (event: any) => {
    this.setState({ title: event.target.value });
  };

  saveList = () => {
    if (this.state.title !== "") {
      this.props.dispatch(
        createList({
          title: this.state.title,
          boardId: this.props.boardId
        })
      );
    }

    this.closeEditor();
  };
  render() {
    let editor = this.state.editorIsOpen ? (
      <div onClick={this.props.onClick}>
        <div>
          <input
            placeholder="Title.."
            onChange={event => this.handleChange(event)}
            onKeyPress={event => this.handleKeyPress(event)}
            ref={this.input}
          />
          <ButtonContainer>
            <Button small primary onClick={() => this.saveList()}>
              <span>add list</span>
            </Button>
          </ButtonContainer>
        </div>
      </div>
    ) : null;

    return (
      <ClickOutside handleClickOutside={this.handleClickOutside}>
        <Wrapper className={this.state.editorIsOpen ? 'editing' : ''}>
          {editor}

          {!this.state.editorIsOpen && (
            <Button
              primary={this.state.title !== "" && this.state.editorIsOpen}
              onClick={this.state.editorIsOpen ? this.saveList : this.openEditor}
            >
              <span>add another list</span>
            </Button>
          )}
        </Wrapper>
      </ClickOutside>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    list: state.lists.byId[ownProps.id]
  };
};

export default connect(
  mapStateToProps,
  null
)(ListCreator);
