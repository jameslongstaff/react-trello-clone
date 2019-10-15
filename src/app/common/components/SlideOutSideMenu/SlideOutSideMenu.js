import React from "react";
import styled from "styled-components";
import { UserCircle } from "styled-icons/fa-solid";

const Wrapper = styled.div`
  background: #2d2c2c;
  height: 100vh;
  width: 4.5rem;
  position: fixed;
  padding: 5.5rem 0 0 0;
`;

const FaceHolder = styled.div`
  background: #efefef;
  border-radius: 3px;
  box-shadow: 0 2px 0px 0 #000000;
  display: block;
  height: 3rem;
  margin: 0 auto;
  position: relative;
  width: 3rem;
  clear: both;
  margin-bottom: 1.25rem;
`;

const FaceHolderInitials = styled.span`
  height: 1rem;
  width: 1.5rem;
  font-size: 1rem;
  font-family: "Roboto Slab", serif;
  font-weight: bold;
  line-height: 0.7em;
  bottom: 0.25rem;
  right: 0.25rem;
  position: absolute;
  margin: auto;
  color: #666;
  text-align: right;
`;

const StyledUser = styled(UserCircle)`
  color: #ddd;
`;

const SlideOutSideMenu = props => {
  return (
    <Wrapper>
      <FaceHolder>
        <FaceHolderInitials>JL</FaceHolderInitials>
      </FaceHolder>
      <FaceHolder>
        <FaceHolderInitials>MB</FaceHolderInitials>
      </FaceHolder>
      <FaceHolder>
        <FaceHolderInitials>DA</FaceHolderInitials>
      </FaceHolder>
    </Wrapper>
  );
};

export default SlideOutSideMenu;
