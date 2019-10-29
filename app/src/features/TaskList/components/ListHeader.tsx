import React, { Component } from "react";

import styled from "styled-components";
import ListTitle from "./ListTitle";
import { DotsHorizontalRounded } from "styled-icons/boxicons-regular/";
import PopoutMenu from "../../../common/components/PopoutMenu/PopoutMenu";
import PopoutMenuLink from "../../../common/components/PopoutMenu/PopoutMenuLink";

const Wrapper = styled.div`
  display: flex;
  position: relative;
`;

const Left = styled.div`
  position: relative;
  width: 100%;
  padding: 0.5rem;
`;

const ListMenuToggle = styled.a`
  height: 1.25rem;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  display: block;
  width: 1.25rem;
  right: 0.5rem;
`;

const DotsIcon = styled(DotsHorizontalRounded)`
  color: #777;
  height: 1.25rem;
  position: absolute;
  top: 0;
  right: 0;
`;

interface IListTitleProps {
  taskListId: string;
}

interface IListTitleState {
  listMenuOpen: boolean;
}

class ListHeader extends Component<IListTitleProps, IListTitleState> {

  constructor(props: IListTitleProps) {
    super(props);
    this.state = {
      listMenuOpen: false,
    };
  }

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
          <ListTitle taskListId={this.props.taskListId} />
          <ListMenuToggle onClick={() => this.handleMenuToggleClick()}>
            <DotsIcon></DotsIcon>
            <PopoutMenu onClose={() => this.handleCloseListMenu()}>
              <PopoutMenuLink onClick={() => { console.log('test') }}>
                <span>Text</span>
              </PopoutMenuLink>
            </PopoutMenu>
          </ListMenuToggle>
        </Left>
      </Wrapper >
    );
  }
};

export default ListHeader;
