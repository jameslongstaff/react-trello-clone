import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import ClickOutside from "../../../common/components/ClickOutside/ClickOutside";
import { updateTaskContent } from "../../../store/actionCreators/card";

const TextArea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  font-size: 0.875rem;
  line-height: 1.3em;
  background: none;
  border: none;
  resize: none;
  padding: 0;
  font-family: "Open Sans", sans-serif;
  background: #fff;
  height: 9rem;
  box-shadow: 0 1px 0 0 #ccc;
  border-radius: 2px;
`;

interface TaskModalDescriptionEditorProps {
  content: string;
  card: any;
  onSaveContent(content: string): void;
}

interface TaskModalDescriptionEditorState {
  isEditing: boolean;
  newContent: string;
  originalContent: string;
  contentHeight: string;
}

class TaskModalDescriptionEditor extends Component<
  TaskModalDescriptionEditorProps,
  TaskModalDescriptionEditorState
> {
  private input: React.RefObject<HTMLTextAreaElement>;
  private wrapper: React.RefObject<HTMLDivElement>;

  constructor(props: TaskModalDescriptionEditorProps) {
    super(props);

    this.state = {
      newContent: this.props.card.content,
      originalContent: this.props.card.content,
      isEditing: false,
      contentHeight: "0"
    };

    this.input = React.createRef();
    this.wrapper = React.createRef();
  }

  handleKeyUp(event: React.KeyboardEvent) {
    if (!!this.input.current && !!this.input.current.scrollHeight) {
      this.setState({
        contentHeight: this.input.current.scrollHeight + "px"
      });
    }
  }

  handleClickOutside = () => {
    if (this.state.isEditing) {
      this.handleSaveContent();
      this.cancelEditMode();
    }
  };

  handleClick = () => {
    if (!this.state.isEditing) {
      this.initEditMode();
    }
  };

  initEditMode = () => {
    if (!this.state.isEditing) {
      this.setState(
        {
          isEditing: true
        },
        () => {
          if (!!this.input.current) {
            this.input.current.focus();
            this.input.current.select();
            this.setState({
              contentHeight: this.input.current.scrollHeight + "px"
            });
          }
        }
      );
    }
  };

  cancelEditMode = () => {
    this.setState({ isEditing: false });
  };

  handleChangeContent = (event: any) => {
    this.setState({ newContent: event.target.value });
  };

  handleSaveContent = () => {
    if (this.state.newContent !== this.state.originalContent) {
      if (this.state.newContent !== "") {
        this.props.onSaveContent(this.state.newContent);
        this.setState({ originalContent: this.state.newContent });
      } else {
        this.setState({ newContent: this.state.originalContent });
      }
    }
  };

  render() {
    return (
      <ClickOutside handleClickOutside={this.handleClickOutside}>
        <div
          ref={this.wrapper}
          onClick={event => {
            this.handleClick();
          }}
        >
          {this.state.isEditing || !this.props.content ? (
            <TextArea
              defaultValue={this.props.content}
              onChange={this.handleChangeContent}
              style={{ height: this.state.contentHeight, overflow: "hidden" }}
              onKeyUp={this.handleKeyUp}
              ref={this.input}
            />
          ) : (
            <ReactMarkdown source={this.props.content} escapeHtml={false} />
          )}
        </div>
      </ClickOutside>
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
    onSaveContent: (content: any) => {
      dispatch(
        updateTaskContent({
          cardId: ownProps.cardId,
          content: content
        })
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskModalDescriptionEditor);
