import React, { Component } from "react";
import styled from "styled-components";
import { darken, transitions } from "polished";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
	background: rgb(0, 121, 191);
	border-radius: 4px;
	cursor: pointer;
  display: inline-flex;
  margin-right: 1rem;
  margin-bottom: 1rem;
	width: calc(33% - 1rem);

	&:hover {
		background: ${darken(0.01, 'rgb(0, 121, 191)')};
	}

	h2 {
		color: #fff;
		font-size: 1rem;
	}
`;

const Inner = styled.div`
	height: 7rem;
  padding: 0.75rem;
  width 100%;
`;

const BoardLink = styled(Link)`
  Width: 100%;
`;

class BoardListingItem extends Component<any, any> {
  render = () => {
    return <Wrapper>
      <BoardLink
        to={{
          pathname: '/board/' + this.props.board.id,
        }}
      >
        <Inner>
          <h2>{this.props.board.title}</h2>
        </Inner>
      </BoardLink>
    </Wrapper>;
  };
}

export default connect()(BoardListingItem);

