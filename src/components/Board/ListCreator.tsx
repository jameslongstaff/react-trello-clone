import React, { useRef, useState } from "react";
import useBoardStore from "../../hooks/useBoardStore";
import { v4 as uuidv4 } from "uuid";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListCreator = () => {
  const wrapperRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [editorIsOpen, setEditorIsOpen] = useState<boolean>(false);
  const boardStore = useBoardStore();

  useOutsideAlerter(wrapperRef, () => {
    setEditorIsOpen(false);
  });

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
      const list = { id: uuidv4(), title, cards: [] };
      boardStore.addList(list);
    }

    closeEditor();
  };

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  return (
    <div
      ref={wrapperRef}
      className={`w-64 mr-2 rounded-[3px] p-1 self-start cursor-pointer ${
        editorIsOpen ? "bg-[#ebecf0]" : "bg-[#ffffff3d] hover:bg-[#ffffff52]"
      }`}
    >
      <input
        className={`${
          !!editorIsOpen ? "block p-2 mb-1 " : "hidden"
        } w-full rounded-[3px] text-sm`}
        placeholder="Title.."
        onChange={(event) => handleChange(event)}
        onKeyPress={(event) => handleKeyPress(event)}
      />

      <div className="flex">
        <button
          className={`text-white py-1 px-2 text-sm rounded-[3px] ${
            editorIsOpen
              ? "bg-[#0079bf] hover:bg-[#026aa7]"
              : "bg-none w-full text-left"
          }`}
          onClick={editorIsOpen ? saveList : openEditor}
        >
          {!editorIsOpen && (
            <FontAwesomeIcon
              className="text-white mr-1"
              icon={["fas", "plus"]}
            />
          )}
          Add list
        </button>

        <button
          className={`${editorIsOpen ? "h-auto" : "h-0"} ml-2 overflow-hidden`}
          onClick={closeEditor}
        >
          <FontAwesomeIcon className="text-[#6b778c]" icon={["fas", "xmark"]} />
        </button>
      </div>
    </div>
  );
};

export default ListCreator;
