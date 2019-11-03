import React, { ReactElement } from "react";
import styled from "styled-components";

const LinkHeader = styled.div`
	color: #000;
	display: block;
	font-family: "Roboto Slab",serif;
	font-size: 1rem;
	font-weight: bold;
	padding: 0.6rem 0.5rem;
	position: relative;
	text-align: center;
	height: 2.5rem;
	width: 100%;
	
	&:after {
    background-color: #ddd;
    content: '';
    display: block;
    height: 1px;
    left: 0;
    right: 0;
    margin: auto;
    top: 100%;
    position: absolute;
    width: calc(100% - 2rem);
	}
`;

interface SlideOutMenuHeaderProps {
	children?: ReactElement<any> | null;
}

const SlideOutMenuHeader: React.FC<SlideOutMenuHeaderProps> = (props => {
	return (
		<LinkHeader>
			{props.children}
		</LinkHeader>
	);
});

export default SlideOutMenuHeader;
