import React, { ReactElement } from "react";
import styled from "styled-components";

const Link = styled.a`
	border-radius: 3px;
	color: #555;
	display: block;
	font-weight: bold;
	font-size: 0.85rem;
	padding: 0.6rem 0.5rem;
	position: relative;
	text-align: left;
	height: 2.5rem;
	width: 100%;

	&:hover {
		background-color: #ebecf0;
		cursor: pointer;
	}
`;

interface IPopoutMenuLinkProps {
	onClick(): void;
	children?: ReactElement<any> | null;
}

const SlideOutMenuLink: React.FC<IPopoutMenuLinkProps> = (props => {
	return (
		<Link onClick={() => props.onClick()}>
			{props.children}
		</Link>
	);
});

export default SlideOutMenuLink;
