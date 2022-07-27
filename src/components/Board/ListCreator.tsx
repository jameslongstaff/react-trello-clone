import React, { useState } from "react";
import useBoardStore from "../../hooks/useBoardStore";
import { v4 as uuidv4 } from "uuid";
import { setBoard } from "../../utils/persistence";

const ListCreator = () => {
  const [title, setTitle] = useState<string>("");
  const [editorIsOpen, setEditorIsOpen] = useState<boolean>(false);
  const boardStore = useBoardStore();

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      saveList();
    }
  };

  const openEditor = () => {
    setEditorIsOpen(true);
  };

  const closeEditor = () => {
    setEditorIsOpen(false);
  };

  const saveList = () => {
    if (title !== "") {
      const list = { id: uuidv4(), title: "title", cards: [] };

      boardStore.addList(list);

      setBoard(boardStore.board);
    }

    closeEditor();
  };

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  return (
    <div className="w-64 mr-2 bg-[#ebecf0] rounded-[3px p-3">
      {!!editorIsOpen && (
        <input
          className="w-full rounded-[3px] p-3 mb-2"
          placeholder="Title.."
          onChange={(event) => handleChange(event)}
          onKeyPress={(event) => handleKeyPress(event)}
        />
      )}

      <button
        className="bg-[#0079bf] text-white py-2 px-3 text-sm rounded-[3px]"
        onClick={editorIsOpen ? saveList : openEditor}
      >
        Add list
      </button>
    </div>
  );
};

export default ListCreator;
