import React, { Component } from "react";

import styled from "styled-components";
import ListTitle from "./ListTitle";
import { DotsHorizontalRounded } from "styled-icons/boxicons-regular/";
import Popout from "../../../common/components/Popout/Popout";
import PopoutLink from "../../../common/components/Popout/PopoutLink";
import PopoutHeader from "../../../common/components/Popout/PopoutHeader";
import { connect } from "react-redux";
import { deleteList } from "../../../store/actionCreators/list";

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const Left = styled.div`
  position: relative;
  width: 100%;
  padding: 0.5rem;
`;

const ListMenuToggle = styled.span`
  border-radius: 3px;
  cursor: pointer;
  height: 1.25rem;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  display: block;
  width: 1.25rem;
  right: 0.5rem;

  &:hover {
    background-color: #ddd;
  }
`;

const DotsIcon = styled(DotsHorizontalRounded)`
  color: #777;
  height: 1.25rem;
  position: absolute;
  top: 0;
  right: 0;
`;

interface IListHeaderProps {
  listId: string;
}

interface IListHeaderProps {
  listMenuOpen: boolean;
}

class ListHeader extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      listMenuOpen: false,
    };
  }

  handleDeleteList = () => {
    this.props.dispatch(deleteList({ listId: this.props.listId }))
  };

  handleCloseListMenu = () => {
    this.setState({ listMenuOpen: false });
  };

  handleMenuToggleClick = () => {
    this.setState({ listMenuOpen: !this.state.listMenuOpen });
  }

  render() {
    return (
      <Wrapper>
        <Left>
          <ListTitle taskListId={this.props.listId} />
          <ListMenuToggle onClick={() => this.handleMenuToggleClick()}>
            <DotsIcon></DotsIcon>
            {this.state.listMenuOpen && (
              <Popout onClose={() => this.handleCloseListMenu()}>
                <PopoutHeader>
                  <span>List Actions</span>
                </PopoutHeader>
                <PopoutLink onClick={() => { console.log('test') }}>
                  <span>Clone list..</span>
                </PopoutLink>
                <PopoutLink onClick={() => { this.handleDeleteList() }}>
                  <span>Delete list..</span>
                </PopoutLink>
              </Popout>
            )}
          </ListMenuToggle>
        </Left>
      </Wrapper >
    );
  }
};

export default connect(
  null,
  null,
)(ListHeader);
