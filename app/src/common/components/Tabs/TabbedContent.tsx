import React, { Component, ReactNode } from "react";
import styled from "styled-components";

interface TabbedContentProps {

}

interface TabbedContentState {
	activeTabId: string;
	children: ReactNode,
}


class TabbedContent extends Component<TabbedContentProps, TabbedContentState> {

	public handleTabActivation(tabId: string) {
		this.setState({ activeTabId: tabId })
	}

	constructor(props: TabbedContentProps) {
		super(props);

		this.state = {
		}
	}
};

export default SlideOutMenu;
