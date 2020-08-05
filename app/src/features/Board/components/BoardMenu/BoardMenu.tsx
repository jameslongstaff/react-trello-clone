import React, { Component } from "react";

import SlideOutMenu from "../../../../common/components/SlideOutSideMenu/SlideOutMenu";
import SlideOutMenuPanel from "../../../../common/components/SlideOutSideMenu/SlideOutMenuPanel";

import { connect } from 'react-redux'

import BoardMenuMainPanel from "./BoardMenuMainPanel";
import BoardMenuBackgroundPanel from "./BoardMenuBackgroundPanel";
import { closeBoardMenu } from "../../../../store/actionCreators/ui";

class BoardMenu extends Component<any, any> {

	constructor(props: any) {
		super(props);

		this.state = {
			activePanelId: 'main-panel',
			route: [
				'main-panel',
			],
		};
	}

	handleClose = () => {

	};

	handlePanelChange = (panelId: any) => {
		this.setState({
			activePanelId: panelId,
			route: [...this.state.route.concat(panelId)],
		});
	}

	handleNavigatePrevious = () => {
		const route = [...this.state.route];

		route.splice(-1, 1);

		this.setState({
			activePanelId: route[route.length - 1],
			route,
		});
	}

	panelIsActive = (panelId: string) => {
		const isActive = (this.state.activePanelId === panelId) && this.props.open;
		return isActive;
	}

	canNavigateBack = () => {
		return this.state.route.length > 1;
	}

	render() {
		return (
			<SlideOutMenu
				open={this.props.open}
				canNavigateBack={this.canNavigateBack()}
				onNavigatePrevious={() => this.handleNavigatePrevious()}
				onClose={() => this.props.dispatch(closeBoardMenu())}
			>
				<SlideOutMenuPanel active={this.panelIsActive('main-panel')} id='main-panel'>
					<BoardMenuMainPanel onPanelChange={(panelId: any) => this.handlePanelChange(panelId)} />
				</SlideOutMenuPanel>

				<SlideOutMenuPanel active={this.panelIsActive('background-panel')} id='background-panel'>
					<BoardMenuBackgroundPanel onPanelChange={(panelId: any) => this.handlePanelChange(panelId)} />
				</SlideOutMenuPanel>
			</SlideOutMenu>
		);
	}
};

export default connect(
	null,
	null
)(BoardMenu);
