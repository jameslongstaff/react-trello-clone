/**
 * Class adapted from Medium article written by Eyas Mattar
 * Source: https://medium.com/@eymaslive/scrolling-by-dragging-react-js-reusable-component-2b79e936b41c
 */

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 100%;
  position: relative;
  display: flex;
  overflow-x: auto;
  flex: 1 0 auto;
`;

const ScrollContainer = styled.div`
  flex: 1;
  margin: 0.5rem;
  display: inline-flex;
	position: absolute;
`;

export class ListScroller extends React.Component<any, any> {

	private ref: React.RefObject<HTMLDivElement>;

	constructor(props: any) {
		super(props);
		this.ref = React.createRef();
		this.state = {
			isScrolling: false,
			firstPos: 0,
		};
	}

	onMouseDown = (e: React.MouseEvent) => {
		this.setState({
			...this.state, isScrolling: true,
			firstPos: e.clientX
		});
	};

	onMouseUp = (e: React.MouseEvent) => {
		this.setState({ ...this.state, isScrolling: false });
	};

	onMouseMove = (e: React.MouseEvent) => {
		if (this.state.isScrolling) {
			const { firstPos } = this.state;

			if (this.ref.current) {

				let distance;
				let secondPos = e.clientX;

				if (firstPos > secondPos) {
					//left
					distance = firstPos - secondPos;
					this.ref.current.scrollLeft = this.ref.current.scrollLeft + distance;
				} else {
					//right
					distance = secondPos - firstPos;
					this.ref.current.scrollLeft = this.ref.current.scrollLeft - distance;
				}

				this.setState({
					...this.state,
					firstPos: secondPos,
				});
			}
		}
	};

	render() {
		return (
			<Wrapper
				onMouseDown={this.onMouseDown}
				onMouseUp={this.onMouseUp}
				onMouseMove={this.onMouseMove}
				ref={this.ref}
			>
				<ScrollContainer>
					{this.props.children}
				</ScrollContainer>
			</Wrapper >
		);
	}
}

export default ListScroller;