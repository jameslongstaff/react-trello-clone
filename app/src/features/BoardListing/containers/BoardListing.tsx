import React, { Component } from "react";
import { connect } from "react-redux";
import BoardListingItem from "../components/BoardListingItem";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  position: relative;
  padding: 1rem 0;
`;

class BoardListing extends Component {
  render = () => {
    return <Wrapper>
      <BoardListingItem boardId=""></BoardListingItem>
    </Wrapper>
  };
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
  };
};

export default connect(mapStateToProps)(BoardListing);
