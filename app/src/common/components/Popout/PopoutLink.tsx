import React, { ReactElement } from "react";
import styled from "styled-components";

const Link = styled.a`
	color: #000;
	display: block;
	font-size: 0.85rem;
	padding: 0.35rem 1rem;
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

const PopoutMenuLink: React.FC<IPopoutMenuLinkProps> = (props => {
	return (
		<Link onClick={() => props.onClick()}>
			{props.children}
		</Link>
	);
});

export default PopoutMenuLink;
