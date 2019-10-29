import React, { ReactElement } from "react";
import ClickOutside from "../ClickOutside/ClickOutside";
import styled from "styled-components";

const Wrapper = styled.div`
	position: fixed;
`;

interface IPopoutMenuProps {
	onClose(): void;
	children?: ReactElement<any> | null;
}

const PopoutMenu: React.FC<IPopoutMenuProps> = props => {
	return (
		<ClickOutside handleClickOutside={props.onClose}>
			<div>{props.children}</div>
		</ClickOutside>
	);
};

export default PopoutMenu;
