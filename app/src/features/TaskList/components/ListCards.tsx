import React from "react";

import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Card from "../../Task/containers/Card";

const Wrapper = styled.div`
  padding: 0.5rem;
`;

const Cards = styled.div`
  min-height: 1rem;
`;

interface IListCardsProps {
	listId: string;
	cards: any[];
}

const ListCards: React.FC<IListCardsProps> = props => {
	return (
		<Droppable droppableId={props.listId} type="cards">
			{(provided, snapshot) => (
				<Cards ref={provided.innerRef}>
					{props.cards.map((card, index) => {
						return (
							<Card
								id={card.id}
								key={card.id}
								index={index}
								title={card.title}
							/>
						);
					})}
					{provided.placeholder}
				</Cards>
			)}
		</Droppable>
	);
}

export default ListCards;
