import React from "react";
import styled from "styled-components";

import SlideOutMenuHeader from "../../../../common/components/SlideOutSideMenu/SlideOutMenuHeader";
import SlideOutMenuLink from "../../../../common/components/SlideOutSideMenu/SlideOutMenuLink";

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

const PaddedContainer = styled.div`
	padding: 1rem;
`;


const BoardMenuBackgroundPanel: React.FC<any> = props => {
	return (
		<Wrapper>
			<SlideOutMenuHeader>
				<span>Background</span>
			</SlideOutMenuHeader>
			<PaddedContainer>
				<p>Test</p>
			</PaddedContainer>
		</Wrapper>
	);
};

export default BoardMenuBackgroundPanel;
