import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<Pick<SlideOutMenuPanelProps, 'active'>>`
	background-color: #f4f5f7;
	display: flex;
	height: 100vh;
	width: 20rem;
	position: fixed;
	right: ${(props) => (props.active ? "0" : "-20rem")};
	padding: 0;
	flex-direction: column;
	transition: right 0.6s cubic-bezier(0.19, 1, 0.22, 1);
`;


interface SlideOutMenuPanelProps {
	active: boolean;
	id: string;
	children: any;
}

const SlideOutMenuPanel: React.FC<SlideOutMenuPanelProps> = props => {
	return (
		<Wrapper active={props.active}>
			{props.children}
		</Wrapper>
	);
};

export default SlideOutMenuPanel;
