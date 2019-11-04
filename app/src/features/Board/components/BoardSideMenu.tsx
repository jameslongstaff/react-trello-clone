import React from "react";
import SlideOutMenu from "../../../common/components/SlideOutSideMenu/SlideOutMenu";
import SlideOutMenuHeader from "../../../common/components/SlideOutSideMenu/SlideOutMenuHeader";
import SlideOutMenuLink from "../../../common/components/SlideOutSideMenu/SlideOutMenuLink";
import styled from "styled-components";
import { Bin2 } from "styled-icons/icomoon/Bin2";
import { Paintcan } from "styled-icons/octicons/Paintcan";
import { useDispatch } from 'react-redux'
import { toggleBoardMenu } from "../../../store/actionCreators/board";

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

interface BoardSideMenuProps {
	open: boolean;
}

const BoardSideMenu: React.FC<BoardSideMenuProps> = (props => {
	const dispatch = useDispatch();

	const handleClose = () => {

	};

	return (
		<SlideOutMenu open={props.open} onClose={() => console.log('close')} onClick={() => dispatch(toggleBoardMenu())}>
			<SlideOutMenuHeader>
				<span>Menu</span>
			</SlideOutMenuHeader>
			<PaddedContainer>
				<SlideOutMenuLink onClick={() => console.log('test')}>
					<React.Fragment>
						<IconContainer>
							<BinIcon size='15' />
						</IconContainer>Delete Board
					</React.Fragment>
				</SlideOutMenuLink>
				<SlideOutMenuLink onClick={() => console.log('test')}>
					<React.Fragment>
						<IconContainer>
							<PaintIcon size='20' />
						</IconContainer>Change Background
					</React.Fragment>
				</SlideOutMenuLink>
			</PaddedContainer>
			{/* <SlideOutMenuLink onClick={() => console.log('test')}>
				<span>Header</span>
			</SlideOutMenuLink> */}
		</SlideOutMenu>
	);
});

export default BoardSideMenu;
