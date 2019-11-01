import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { PlusSquare } from "styled-icons/boxicons-solid/";
import ClickOutside from "../../../common/components/ClickOutside/ClickOutside";
import Button from "../../../common/components/Button/Button";
import { createTask } from "../../../store/actionCreators/card";
import { createBoard } from "../../../store/actionCreators/board";

const Wrapper = styled.div`
	background: #eee;
	border-radius: 4px;
	cursor: pointer;
	display: inline-flex;
	height: 7rem;
	width: calc(33% - 1rem);
`;

const TextAreaContainer = styled.div`
	padding: 0.25rem;
	height: 100%;
	width: 100%;
`;

const TextArea = styled.textarea`
  border-radius: 3px;
  background: #fff;
  border: solid 1px #efefef;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 1px 0 0 #ddd;
  height: 4.125rem;
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

class BoardCreator extends Component<any, any> {
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
			this.handleCreateBoard();
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
			this.closeEditor();
		}
	};

	handleCreateBoard = () => {
		if (this.state.title !== "") {
			this.props.dispatch(
				createBoard({
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
				<Button primary onClick={() => this.handleCreateBoard()}>
					<span>Create Board</span>
				</Button>
			</TextAreaContainer>
		) : null;

		return (
			<ClickOutside handleClickOutside={this.handleClickOutside}>
				<Wrapper>
					{editor}
					{!this.state.editorIsOpen && (
						<Button
							onClick={this.openEditor}
						>
							<PlusSquare size="20" />
						</Button>
					)}
				</Wrapper>
			</ClickOutside>
		);
	}
}

export default connect()(BoardCreator);
