import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	background: rgb(0, 121, 191);
	border-radius: 4px;
	height: 7rem;
  width: 15rem;
`;

class BoardListingItem extends Component<any, any> {
	render = () => {
		return <Wrapper></Wrapper>;
	};
}

export default BoardListingItem;
