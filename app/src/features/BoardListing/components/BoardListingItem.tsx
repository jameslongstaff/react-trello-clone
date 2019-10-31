import React, { Component } from "react";
import styled from "styled-components";
import { darken, transitions } from "polished";
import { connect } from "react-redux";

const Wrapper = styled.a`
	background: rgb(0, 121, 191);
	cursor: pointer;
	display:block;
	border-radius: 4px;
	height: 7rem;
	padding: 0.75rem;
	width: 15rem;
	
	&:hover {
		background: ${darken(0.01, 'rgb(0, 121, 191)')};
	}

	h2 {
		color: #fff;
		font-size: 1rem;
	}
`;

class BoardListingItem extends Component<any, any> {
	render = () => {
		const boardUrl = `/board/${this.props.board.id}`;
		return <Wrapper href={boardUrl}>
			<h2>{this.props.board.title}</h2>
		</Wrapper>;
	};
}

const mapStateToProps = (state: any, ownProps: any) => {
};

export default connect(mapStateToProps)(BoardListingItem);

