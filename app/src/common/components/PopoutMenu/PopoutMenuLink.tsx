import React, { ReactElement } from "react";
import styled from "styled-components";
import Button from "../Button/Button";

const Wrapper = styled.div`
`;

interface IPopoutMenuLinkProps {
	onClick(): void;
	children?: ReactElement<any> | null;
}

const PopoutMenuLink: React.FC<IPopoutMenuLinkProps> = (props => {
	return (
		<Wrapper>
			<Button onClick={() => props.onClick()}>
				{props.children}
			</Button>
		</Wrapper>
	);
});

export default PopoutMenuLink;
