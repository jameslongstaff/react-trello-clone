import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";
import styled from "styled-components";
import { fetchBoards } from "../../../store/actionCreators/board";
import BoardListingItem from "../components/BoardListingItem";
import BoardCreator from "../components/BoardCreator";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 50rem;
  margin: 0 auto;
  position: relative;
  padding: 2rem 0;
`;

class BoardListing extends Component<any, any> {

  async componentDidMount() {
    this.props.dispatch(fetchBoards());
  }

  render = () => {

    return (
      <React.Fragment>
        {this.props.loading && <Spinner></Spinner>}
        {!this.props.loading && (
          <Wrapper>
            {this.props.boards.length > 0 && (
              this.props.boards.map((board: any, index: number) => {
                return <BoardListingItem key={board.id} board={board} />;
              })
            )}
            <BoardCreator />
          </Wrapper>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    boards: state.boards.allIds.map((id: any) => state.boards.byId[id]),
  };
};

export default connect(mapStateToProps)(BoardListing);
