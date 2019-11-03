import React from "react";

import List from "../../TaskList/containers/List";

interface IListsProps {
	lists: any[];
}

const Lists: React.FC<any> = props => {

	// prevent interference with board scroll when dragging lists and cards
	// const handleListClick = (e: React.MouseEvent) => {
	// 	console.log('click');
	// 	e.stopPropagation();
	// }

	return (
		props.lists.map((listId: string, index: number) => {
			return (
				<List key={listId} id={listId} index={index} />
			)
		})
	);
}

export default Lists;

