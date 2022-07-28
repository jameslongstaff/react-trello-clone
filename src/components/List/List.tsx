import useBoardStore from "../../hooks/useBoardStore";
import CardType from "../../types/CardType";
import { updateList } from "../../utils/persistence";
import Card from "../Card/Card";
import EditableTitle from "../EditableTitle";
import PopOutMenu, { PopoutMenuItemType } from "../PopOutMenu";
import CardCreator from "./CardCreator";

const List = (props: any) => {
  const boardStore = useBoardStore();

  const handleBoardUpdate = (title: string) => {
    const updatedBoard = updateList({ ...props.list, title });
    boardStore.setBoard(updatedBoard);
  };

  const deleteList = () => {
    console.log("delete list");
  };

  const listMenuItems: PopoutMenuItemType[] = [
    { title: "Delete list", fn: deleteList },
  ];

  return !!props.list ? (
    <div className="w-64 mr-2 bg-[#ebecf0] rounded-[3px] border-solid border-[#ccc] shadow-sm self-start">
      <div className="p-2 w-full">
        <header className="flex mb-2">
          <EditableTitle
            title={props.list.title}
            tag="h2"
            onSave={handleBoardUpdate}
            className="font-semibold text-base"
          />
          <PopOutMenu items={listMenuItems} className="ml-auto mr-2" />
        </header>

        {props.list.cards &&
          props.list.cards.map((card: CardType) => <Card card={card} />)}

        <CardCreator listId={props.list.id} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default List;
