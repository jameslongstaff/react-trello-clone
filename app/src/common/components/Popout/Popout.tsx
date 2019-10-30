import React, { ReactElement } from "react";
import ClickOutside from "../ClickOutside/ClickOutside";
import styled from "styled-components";

const Wrapper = styled.div`
	box-shadow: 0 8px 16px -4px rgba(9,30,66,.25), 0 0 0 1px rgba(9,30,66,.08);
	background-color: #fff;
	border-radius: 3px;
	position: absolute;
	top: calc(100% + 0.25rem);
	width: 15rem;
	z-index: 3;
`;

interface IPopoutMenuProps {
	onClose(): void;
	children?: any;
}

const PopoutMenu: React.FC<IPopoutMenuProps> = props => {
	return (
		<ClickOutside handleClickOutside={props.onClose}>
			<Wrapper>
				{props.children}
			</Wrapper>
		</ClickOutside >
	);
};

export default PopoutMenu;
