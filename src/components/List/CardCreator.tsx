import React, { useEffect, useRef, useState } from "react";
import useBoardStore from "../../hooks/useBoardStore";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addCardToList } from "../../utils/persistence";

const CardCreator = (props: any) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState<string>("");
  const [editorIsOpen, setEditorIsOpen] = useState<boolean>(false);
  const boardStore = useBoardStore();

  useOutsideAlerter(wrapperRef, () => {
    if (editorIsOpen) {
      saveCard();
    }

    setEditorIsOpen(false);
  });

  useEffect(() => {
    if (!!inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editorIsOpen]);

  const handleBoardUpdate = () => {
    const updatedBoard = addCardToList(props.listId, title);
    boardStore.setBoard(updatedBoard);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      saveCard();
    }

    if (event.key === "Escape") {
      closeEditor();
    }
  };

  const openEditor = () => {
    setEditorIsOpen(true);

    if (!!inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const closeEditor = () => {
    setEditorIsOpen(false);
  };

  const saveCard = () => {
    if (title !== "") {
      handleBoardUpdate();
    }

    closeEditor();
  };

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  return (
    <div ref={wrapperRef} className={`w-full mr-2 rounded-[3px]`}>
      {!!editorIsOpen && (
        <textarea
          ref={inputRef}
          className="bg-white rounded-[3px] shadow-sm h-20 p-2 w-full"
          placeholder="Title.."
          onChange={(event) => handleChange(event)}
          onKeyDown={(event) => handleKeyPress(event)}
        />
      )}

      <div className="flex">
        <button
          className={`py-1  text-sm rounded-[3px]  ${
            editorIsOpen
              ? "bg-[#0079bf] px-4 hover:bg-[#026aa7] text-white text-center"
              : "bg-none px-2 text-[#5e6c84] hover:bg-[#091e4214] text-left w-full"
          }`}
          onClick={editorIsOpen ? saveCard : openEditor}
        >
          {!editorIsOpen && (
            <FontAwesomeIcon
              className="text-[#6b778c] mr-1"
              icon={["fas", "plus"]}
            />
          )}
          Add a card
        </button>

        {editorIsOpen && (
          <button className="ml-2" onClick={saveCard}>
            <FontAwesomeIcon
              className="text-[#6b778c]"
              icon={["fas", "xmark"]}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default CardCreator;
