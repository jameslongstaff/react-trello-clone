import React, { ReactElement } from "react";
import styled from "styled-components";

const LinkHeader = styled.div`
	color: #555;
	font-size: 0.85rem;
	padding: 0.35rem 1rem;
	position: relative;
	text-align: center;
	
	&:after {
		background-color: #eee;
		content: '';
		display: block;
		height: 1px;
		top: 100%;
		position: absolute;
		width: calc(100% - 2rem);
	}
`;

interface IPopoutHeaderProps {
	children?: ReactElement<any> | null;
}

const PopoutHeader: React.FC<IPopoutHeaderProps> = (props => {
	return (
		<LinkHeader>
			{props.children}
		</LinkHeader>
	);
});

export default PopoutHeader;
