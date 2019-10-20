import { Component } from "react";
import PropTypes from "prop-types";
import onClickOutside from "react-onclickoutside";

interface IClickOutsideWrapperProps {
  handleClickOutside(): void;
}

// Wrap component in this component to handle click outisde of that component
class ClickOutsideWrapper extends Component<IClickOutsideWrapperProps> {
  static propTypes = {
    handleClickOutside: PropTypes.func.isRequired
  };
  handleClickOutside = () => {
    this.props.handleClickOutside();
  };
  render = () => this.props.children;
}

export default onClickOutside(ClickOutsideWrapper);
