import React, { useRef, useState } from "react";
import useBoardStore from "../../hooks/useBoardStore";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addListToBoard } from "../../utils/persistence";
import { v4 as uuidv4 } from "uuid";
import useInputFocus from "../../hooks/useInputFocus";

const ListCreator = () => {
  const wrapperRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");
  const [editorIsOpen, setEditorIsOpen] = useState<boolean>(false);
  const boardStore = useBoardStore();

  useInputFocus(inputRef, editorIsOpen);

  useOutsideAlerter(wrapperRef, () => {
    setEditorIsOpen(false);
  });

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      updateBoard();
    }

    if (event.key === "Escape") {
      closeEditor();
    }
  };

  const openEditor = () => {
    setEditorIsOpen(true);
  };

  const closeEditor = () => {
    setEditorIsOpen(false);
    setTitle("");
  };

  const updateBoard = () => {
    if (title !== "") {
      const list = {
        title,
        id: uuidv4(),
        cards: []
      };

      addListToBoard(list);
      boardStore.addListToBoard(list);
    }

    closeEditor();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div
      ref={wrapperRef}
      className={`w-64 mr-2 rounded-[3px] p-1 self-start cursor-pointer ${
        editorIsOpen ? "bg-[#ebecf0]" : "bg-[#ffffff3d] hover:bg-[#ffffff52]"
      }`}>
      <input
        ref={inputRef}
        className={`${editorIsOpen ? "block p-2 mb-1 " : "hidden"} w-full rounded-[3px] text-sm`}
        placeholder="Title.."
        onChange={(event) => handleChange(event)}
        onKeyDown={(event) => handleKeyPress(event)}
      />

      <div className="flex">
        <button
          className={`text-white py-1 text-sm rounded-[3px] ${
            editorIsOpen ? "bg-[#0079bf] px-4 hover:bg-[#026aa7]" : "bg-none w-full text-left px-2"
          }`}
          onClick={editorIsOpen ? updateBoard : openEditor}>
          {!editorIsOpen && <FontAwesomeIcon className="text-white mr-1" icon={["fas", "plus"]} />}

          {!boardStore.lists.length || editorIsOpen ? "Add a list" : "Add another list"}
        </button>

        <button
          className={`${editorIsOpen ? "h-auto" : "h-0"} ml-2 overflow-hidden`}
          onClick={closeEditor}>
          <FontAwesomeIcon className="text-[#6b778c]" icon={["fas", "xmark"]} />
        </button>
      </div>
    </div>
  );
};

export default ListCreator;
