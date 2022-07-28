import React, { useState } from "react";
import EditableTitle from "../EditableTitle";

const BoardTitle = (props: any) => {
  const [newTitle, setNewTitle] = useState(props.title);
  const [originalTitle, setOriginalTitle] = useState(props.title);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleSaveTitle = () => {
    if (newTitle !== originalTitle) {
      if (newTitle !== "") {
        // persist
        // this.props.onSaveTitle(newTitle);
        setOriginalTitle(newTitle);
      } else {
        setNewTitle(originalTitle);
      }
    }
  };

  return (
    <EditableTitle
      title={newTitle}
      tag="h1"
      onChange={handleChangeTitle}
      onSave={handleSaveTitle}
      className="font-semibold text-white text-2xl bg-[#ffffff3d] rounded-[3px]"
      spacingClass="px-2"
    />
  );
};

export default BoardTitle;
