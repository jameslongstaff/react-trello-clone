import React from "react";
import ClickOutside from "../ClickOutside/ClickOutside";
import styled from "styled-components";

const Wrapper = styled.div`
`;

interface IPromptProps {
	onCancel(): void;
	onAccept(): void;
	title: string;
}

const PopoutMenu: React.FC<IPromptProps> = props => {
	return (
		<ClickOutside handleClickOutside={props.onCancel}>
			<Wrapper>

			</Wrapper>
		</ClickOutside >
	);
};

export default PopoutMenu;
