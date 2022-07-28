import React, { useRef, useState } from "react";
import useBoardStore from "../../hooks/useBoardStore";
import { v4 as uuidv4 } from "uuid";
import { setBoard } from "../../utils/persistence";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardCreator = (props: any) => {
  const wrapperRef = useRef(null);
  const [title, setTitle] = useState<string>("");
  const [editorIsOpen, setEditorIsOpen] = useState<boolean>(false);
  const boardStore = useBoardStore();

  useOutsideAlerter(wrapperRef, () => {
    setEditorIsOpen(false);
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      saveCard();
    }
  };

  const openEditor = () => {
    setEditorIsOpen(true);

    // if (!!this.input && this.input.current) {
    //   this.input.current.focus();
    // }
  };

  const closeEditor = () => {
    setEditorIsOpen(false);
  };

  const handleClickOutside = () => {
    if (editorIsOpen) {
      saveCard();
    }
  };

  const saveCard = () => {
    if (title !== "") {
      const listId: string = props.listId;

      const card = { id: uuidv4(), title: "title", content: "content" };

      boardStore.addCard(listId, card);

      setBoard(boardStore.board);
    }

    closeEditor();
  };

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  return (
    <div ref={wrapperRef} className={`w-full mr-2 rounded-[3px] p-1`}>
      {!!editorIsOpen && (
        <textarea
          className="w-full rounded-[3px] p-3 text-sm"
          placeholder="Title.."
          onChange={(event) => handleChange(event)}
          onKeyPress={(event) => handleKeyPress(event)}
        />
      )}

      <div className="flex">
        <button
          className={`py-1 px-2 text-sm rounded-[3px] ${
            editorIsOpen
              ? "bg-[#0079bf] text-white text-center"
              : "bg-none text-[#5e6c84] text-left w-full"
          }`}
          onClick={editorIsOpen ? saveCard : openEditor}
        >
          <FontAwesomeIcon
            className="text-[#6b778c] mr-1"
            icon={["fas", "plus"]}
          />
          Add a card
        </button>

        {editorIsOpen && (
          <button className="ml-2" onClick={closeEditor}>
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
