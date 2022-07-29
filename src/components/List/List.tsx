import { useDrag } from "react-dnd";
import useBoardStore from "../../hooks/useBoardStore";
import CardType from "../../types/CardType";
import ListType from "../../types/ListType";
import { deleteList, updateList } from "../../utils/persistence";
import Card from "../Card/Card";
import EditableTitle from "../EditableTitle";
import PopOutMenu, { PopoutMenuItemType } from "../PopOutMenu";
import CardCreator from "./CardCreator";

export type ListPropsType = {
  list: ListType;
};

const List = (props: ListPropsType) => {
  const boardStore = useBoardStore();

  const [, dragRef] = useDrag(
    () => ({
      type: "List",
      item: {
        id: props.list.id,
      },
      end: (item, monitor) => {},
    }),
    []
  );

  const handleBoardUpdate = (title: string) => {
    const updatedBoard = updateList({ ...props.list, title });
    boardStore.setBoard(updatedBoard);
  };

  const handleDeleteList = () => {
    const updatedBoard = deleteList(props.list.id);
    boardStore.setBoard(updatedBoard);
  };

  const listMenuItems: PopoutMenuItemType[] = [
    { title: "Delete list", fn: handleDeleteList },
  ];

  return !!props.list ? (
    <div
      ref={dragRef}
      className="mr-2 bg-[#ebecf0] rounded-[3px] border-solid border-[#ccc] shadow-sm self-start"
    >
      <div className="p-2 w-full">
        <header className="flex mb-2">
          <EditableTitle
            title={props.list.title}
            tag="h2"
            onSave={handleBoardUpdate}
            className="font-semibold text-base"
          />
          <PopOutMenu items={listMenuItems} className="ml-auto" />
        </header>

        {props.list.cards &&
          props.list.cards.map((card: CardType) => (
            <Card key={card.id} card={card} />
          ))}

        <CardCreator listId={props.list.id} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default List;
