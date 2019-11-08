import React, { Component } from "react";

//thirdparty
import { connect } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.div`
	border-radius: 5px;
	display: flex;
	flex-basis: 50%;
	flex-flow: column;
  align-items: stretch;
	height: 25rem;
	position: relative;
	z-index: 2;
`;

const FormContainer = styled.div`
	background: #fff;
	border-radius: 0px 5px 5px 5px;
	flex: 1;
`;

const LoginLink = styled.div`
	background: #fff;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	color: #026aa7;
	cursor: pointer;
	font-family: "Roboto Slab", serif;
	flex: 0 0 50%;
	font-weight: bold;
	padding: 0.75rem 0;
	text-align: center;
`;

const RegisterLink = styled.div`
	background-color: #026aa7;
	cursor: pointer;
	color: #fff;
	font-family: "Roboto Slab", serif;
	flex: 0 0 50%;
	font-weight: bold;
	padding: 0.75rem 0;
	text-align: center;
`;

const HeaderBar = styled.div`
	display: flex;
`;

type FormContext = 'Login' | 'Register';

interface IFormState {
	context: FormContext;
}

class Login extends Component<any, IFormState> {

	constructor(props: any) {
		super(props);

		this.state = {
			context: 'Login',
		};
	}

	public isActive(context: FormContext) {
		return this.state.context === context;
	}

	render() {
		return (
			<Wrapper>
				<HeaderBar>
					<LoginLink>Login</LoginLink>
					<RegisterLink>Register</RegisterLink>
				</HeaderBar>
				<FormContainer></FormContainer>
			</Wrapper>
		);
	}
}

export default connect()(Login);
