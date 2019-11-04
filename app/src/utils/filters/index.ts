export const getCardById = (state: any, cardId: string) => {
	return state.cards.byId[cardId];
}

export const getListById = (state: any, listId: string) => {
	return state.lists.byId[listId];
}

export const getCardsByListId = (state: any, listId: string) => {
	return state.lists.byId[listId].cards.map(
		(cardId: string) => state.cards.byId[cardId]
	);
}

export const isCardBeingEdited = (state: any, listId: string) => {
	return state.lists.byId[listId].cards.map(
		(cardId: string) => state.cards.byId[cardId]
	).some((c: any) => c.isEditing);;
}