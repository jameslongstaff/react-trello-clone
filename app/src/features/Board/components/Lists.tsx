import React from "react";

import { Droppable } from "react-beautiful-dnd";
import List from "../../TaskList/containers/List";

interface IListsProps {
	lists: any[];
}

const Lists: React.FC<any> = props => {
	return (
		props.lists.map((listId: string, index: number) => {
			return <List key={listId} id={listId} index={index} />;
		})
	);
}

export default Lists;

