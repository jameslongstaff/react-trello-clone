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

interface IEditableTitleState {
  isEditing: boolean;
}

class EditableTitle extends Component<any, IEditableTitleState> {
  private input: React.RefObject<HTMLInputElement>;

  static defaultProps = {};

  constructor(props: any) {
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

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (this.state.isEditing) {
      if (event.key === "Enter") {
        this.handleSave();
      }
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onChange !== undefined) {
      this.props.onChange(event);
    }
  };

  handleClick = (event: React.MouseEvent<HTMLSpanElement>) => {
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
        if (!!this.input && this.input.current) {
          this.input.current.focus();
          this.input.current.select();
        }
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
    return (
      <ClickOutside handleClickOutside={this.handleClickOutside}>
        <p>
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
        </p>
      </ClickOutside>
    );
  }
}

export default EditableTitle;
