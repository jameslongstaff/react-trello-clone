import React, { Component } from "react";
import ClickOutside from "../ClickOutside/ClickOutside";
import styled from "styled-components";

//rename to editable text element

const Input = styled.input`
  background: none;
  border: none;
  padding: 0;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const ElementContainer = styled.span`
  cursor: pointer;
  display: block;
  width: 100%;
`;

class EditableTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };

    this.input = React.createRef();
  }

  handleClickOutside = () => {
    if (this.state.isEditing) {
      this.handleSave();
      this.cancelEditMode();
    }
  };

  handleKeyPress = event => {
    if (this.state.isEditing) {
      if (event.key === "Enter") {
        this.handleSave();
      }
    }
  };

  handleChange = event => {
    if (this.props.onChange !== undefined) {
      this.props.onChange(event);
    }
  };

  handleClick = event => {
    this.initEditMode();
  };

  handleSave = () => {
    if (this.props.onSave !== undefined) {
      this.props.onSave();
    }
    this.cancelEditMode();
  };

  initEditMode = () => {
    if (!this.state.isEditing) {
      this.setState({ isEditing: true }, () => {
        this.input.current.focus();
        this.input.current.select();
      });
    }
  };

  cancelEditMode = () => {
    if (this.state.isEditing) {
      this.setState({ isEditing: false });
    }
  };

  //theme provider - styled components

  render() {
    const ElementTag = this.props.tag ? `${this.props.tag}` : `p`;

    return (
      <ClickOutside handleClickOutside={this.handleClickOutside}>
        <ElementTag>
          <ElementContainer
            onClick={event => {
              this.handleClick(event);
            }}
          >
            {this.state.isEditing ? (
              <Input
                type={this.props.type ? this.props.type : "text"}
                value={this.props.title}
                onChange={event => {
                  this.handleChange(event);
                }}
                onKeyPress={event => {
                  this.handleKeyPress(event);
                }}
                ref={this.input}
              />
            ) : (
              this.props.title
            )}
          </ElementContainer>
        </ElementTag>
      </ClickOutside>
    );
  }
}

export default EditableTitle;
