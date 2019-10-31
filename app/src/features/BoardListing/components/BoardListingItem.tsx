import React, { Component } from "react";
import styled from "styled-components";
import { darken, transitions } from "polished";

const Wrapper = styled.div`
	background: rgb(0, 121, 191);
	cursor: pointer;
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
		return <Wrapper>
			<h2>This is my first ever board created</h2>
		</Wrapper>;
	};
}

export default BoardListingItem;
