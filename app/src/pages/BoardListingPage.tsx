import React from "react";
import BackgroundLayer from "../common/components/BackgroundLayer/BackgroundLayer";
import TopBar from "../common/components/TopBar/TopBar";
import BoardListing from "../features/BoardListing/containers/BoardListing";

const BoardPage: React.FC<any> = (props: any) => {
	return (
		<React.Fragment>
			<BackgroundLayer />
			<TopBar />
			<BoardListing />
		</React.Fragment>
	);
};

export default BoardPage;
