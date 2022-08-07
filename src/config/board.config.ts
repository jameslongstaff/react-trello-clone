import CardType from "../types/CardType";

const config = {
  initialBoardState: {
    board: {
      title: "Example board",
    },
    lists: ["list1", "list2", "list3"],
    listsById: {
      list1: {
        title: "Example list 2",
        id: "list1",
        cards: [
          {
            id: "card1",
            title: "Example card 1 title",
            listId: "list1",
          },
          {
            id: "card2",
            title: "Example card 2 title",
            listId: "list1",
          },
          {
            id: "card3",
            title: "Example card 3 title",
            listId: "list1",
          },
        ] as CardType[],
      },
      list2: {
        title: "Example list 1",
        id: "list2",
        cards: [
          {
            id: "card4",
            title: "Example card 4 title",
            listId: "list2",
          },
        ] as CardType[],
      },
      list3: {
        title: "Example empty list 1",
        id: "list2",
        cards: [] as CardType[],
      },
    },
    cardModal: {
      show: false,
      card: undefined,
    },
  },
};

export default config;
