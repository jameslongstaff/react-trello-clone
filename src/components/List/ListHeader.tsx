import ListType from "../../types/ListType";
import EditableTitle from "../EditableTitle";
import PopOutMenu, { PopoutMenuItemType } from "../PopOutMenu";

export type ListHeaderPropsType = {
  list: ListType;
  onDeleteList: () => void;
  onSaveTitle: (title: string) => void;
};

const ListHeader = (props: ListHeaderPropsType) => {
  const listMenuItems: PopoutMenuItemType[] = [{ title: "Delete list", fn: props.onDeleteList }];

  return (
    <header className="flex mb-2">
      <EditableTitle
        title={props.list.title}
        tag="h2"
        onSave={props.onSaveTitle}
        className="font-semibold text-base"
      />
      <PopOutMenu items={listMenuItems} className="ml-auto" />
    </header>
  );
};

export default ListHeader;
