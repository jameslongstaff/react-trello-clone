import React, { useState } from "react";
import useBoardStore from "../../hooks/useBoardStore";
import { v4 as uuidv4 } from "uuid";
import Card from "../Card/Card";
import { addCardToList } from "../../utils/board";
import { setBoard } from "../../utils/persistence";

const CardCreator = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [editorIsOpen, setEditorIsOpen] = useState<boolean>(false);
  const boardStore = useBoardStore();

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
    <>
      {!!editorIsOpen && (
        <textarea
          className="w-full rounded-[3px] p-3"
          placeholder="Title.."
          onChange={(event) => handleChange(event)}
          onKeyPress={(event) => handleKeyPress(event)}
        />
      )}

      <button
        className="bg-[#0079bf] text-white py-2 px-3 text-sm rounded-[3px]"
        onClick={editorIsOpen ? saveCard : openEditor}
      >
        Add card
      </button>
    </>
  );
};

export default CardCreator;
