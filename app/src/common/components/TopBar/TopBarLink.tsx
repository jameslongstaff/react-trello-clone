import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { rgba } from "polished";

const Wrapper = styled.div`
	display: inline-flex;
	padding: 0.2rem 0.3rem;
	border-radius: 3px;
	background-color: ${rgba('#fff', 0.15)}
`;

interface ITopBarProps {
}

const TopBar: React.FC<any> = props => {
	return (
		<Wrapper>
			<Link to={{ pathname: '/' }}>
				{props.children}
			</Link>
		</Wrapper>
	);
};

export default TopBar;
