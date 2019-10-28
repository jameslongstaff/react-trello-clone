import React, { Component } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

class CardEditModalLinks extends Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (<div>
      {/* Delete card */}
      {/* Clone card */}
    </div>);
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
  };
};



export default connect(
  mapStateToProps,
  null
)(CardEditModalLinks);
