const config = {
  initialBoardState: {
    board: {
      title: ""
    },
    lists: [],
    listsById: {},
    cardModal: {
      show: false,
      card: undefined
    }
  },
  initialLocalStorageBoard: {
    title: "Example board",
    lists: [
      {
        id: "exampleList1",
        title: "Example list 1",
        cards: [
          {
            id: "card1",
            content: "",
            title: "Example card 1 title",
            listId: "exampleList1"
          },
          {
            id: "card2",
            content: "",
            title: "Example card 2 title",
            listId: "exampleList1"
          },
          {
            id: "card3",
            content: "",
            title: "Example card 3 title",
            listId: "exampleList1"
          }
        ]
      },
      {
        id: "exampleList2",
        title: "Example list 2",
        cards: [
          {
            id: "card4",
            content: "",
            title: "Example card 4 title",
            listId: "exampleList2"
          },
          {
            id: "card5",
            content: "",
            title: "Example card 5 title",
            listId: "exampleList2"
          },
          {
            id: "card6",
            content: "",
            title: "Example card 6 title",
            listId: "exampleList2"
          }
        ]
      }
    ]
  }
};

export default config;
