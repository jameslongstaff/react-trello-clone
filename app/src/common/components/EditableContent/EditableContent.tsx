import React, { Component, ReactElement } from "react";
import ClickOutside from "../ClickOutside/ClickOutside";
import classes from "./EditableContent.module.css";
import ReactMarkdown from "react-markdown";

interface IEditableContentProps {
  onClose(): void;
  children: ReactElement<any> | null;
  content: string | null;
}

interface IEditableContentState {
  isEditing: boolean;
  contentHeight: string | null;
}

class EditableContent extends Component<
  IEditableContentProps,
  IEditableContentState
> {
  // private input: React.RefObject<HTMLInputElement>;
  // private content: React.RefObject<HTMLElement>;
  // private wrapper: React.RefObject<HTMLElement>;

  // constructor(props: IEditableContentProps) {
  //   super(props);
  //   this.state = {
  //     isEditing: false,
  //     contentHeight: null
  //   };

  //   this.input = React.createRef();
  //   this.content = React.createRef();
  //   this.wrapper = React.createRef();
  // }

  // handleKeyUp(event: CustomEvent) {
  //   const { scrollHeight } = this.input.current;

  //   this.setState({
  //     contentHeight: this.input.current.scrollHeight + "px"
  //   });
  // }

  // handleClickOutside = () => {
  //   if (this.state.isEditing) {
  //     this.props.onSave();
  //     this.cancelEditMode();
  //   }
  // };

  // handleClick = () => {
  //   if (!this.state.isEditing) {
  //     this.initEditMode();
  //   }
  // };

  // initEditMode = () => {
  //   if (!this.state.isEditing) {
  //     this.setState(
  //       {
  //         isEditing: true
  //       },
  //       () => {
  //         this.input.current.focus();
  //         this.input.current.select();
  //         this.setState({
  //           contentHeight: this.input.current.scrollHeight + "px"
  //         });
  //       }
  //     );
  //   }
  // };

  cancelEditMode = () => {
    this.setState({ isEditing: false });
  };

  render() {
    return (
      <div></div>
      // <ClickOutside handleClickOutside={this.handleClickOutside}>
      //   <div className={classes.EditableContent} ref={this.wrapper}>
      //     <span
      //       onClick={event => {
      //         this.handleClick(event);
      //       }}
      //     >
      //       {this.state.isEditing || !this.props.content ? (
      //         <textarea
      //           defaultValue={this.props.content}
      //           className={this.props.content ? null : "empty"}
      //           onChange={event => {
      //             this.props.onChange(event);
      //           }}
      //           style={{ height: this.state.contentHeight, overflow: "hidden" }}
      //           onKeyUp={event => this.handleKeyUp()}
      //           ref={this.input}
      //         />
      //       ) : (
      //         <ReactMarkdown source={this.props.content} escapeHtml={false} />
      //       )}
      //     </span>
      //   </div>
      // </ClickOutside>
    );
  }
}

export default EditableContent;
