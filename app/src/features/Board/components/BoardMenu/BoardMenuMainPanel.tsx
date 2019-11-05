import React from "react";
import styled from "styled-components";

import { Bin2 } from "styled-icons/icomoon/Bin2";
import { Paintcan } from "styled-icons/octicons/Paintcan";

import SlideOutMenuHeader from "../../../../common/components/SlideOutSideMenu/SlideOutMenuHeader";
import SlideOutMenuLink from "../../../../common/components/SlideOutSideMenu/SlideOutMenuLink";

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
`;

const PaddedContainer = styled.div`
	padding: 1rem;
`;

const IconContainer = styled.div`
	display: inline-block;
	position: relative;
	top: -0.15rem;
	width: 1.75rem;
`;

const BinIcon = styled(Bin2)`
	color: #000;
`;

const PaintIcon = styled(Paintcan)`
	color: #000;
	left: -0.15rem;
	position: relative;
`;

const BoardMenuMainPanel: React.FC<any> = props => {
	return (
		<Wrapper>
			<SlideOutMenuHeader>
				<span>Menu</span>
			</SlideOutMenuHeader>
			<PaddedContainer>
				<SlideOutMenuLink onClick={() => console.log('test')}>
					<>
						<IconContainer>
							<BinIcon size='15' />
						</IconContainer>Delete Board
					</>
				</SlideOutMenuLink>
				<SlideOutMenuLink onClick={() => props.onPanelChange('background-panel')}>
					<>
						<IconContainer>
							<PaintIcon size='20' />
						</IconContainer>Change Background
					</>
				</SlideOutMenuLink>
			</PaddedContainer>
		</Wrapper>
	);
};

export default BoardMenuMainPanel;
