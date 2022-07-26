import React, { useState } from "react";
import useBoardStore from "../../hooks/useBoardStore";
import { v4 as uuidv4 } from "uuid";
import Card from "../Card/Card";
import { addCardToList } from "../../utils/board";

const CardCreator = (props: any) => {
  const [title, setTitle] = useState<string>("");
  const [editorIsOpen, setEditorIsOpen] = useState<boolean>(false);
  const boardStore = useBoardStore();

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      saveTask();
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
      saveTask();
    }
  };

  const saveTask = () => {
    if (title !== "") {
      const listId: string = props.listId;

      const card = { id: uuidv4(), title: "title", content: "content" };

      localStorage.setItem(
        "board",
        JSON.stringify(addCardToList(boardStore.board, listId, card))
      );

      boardStore.addCard(listId, card);
    }

    closeEditor();
  };

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  return (
    <>
      {!!editorIsOpen && (
        <div>
          <textarea
            placeholder="Title.."
            onChange={(event) => handleChange(event)}
            onKeyPress={(event) => handleKeyPress(event)}
          />
        </div>
      )}

      <button onClick={editorIsOpen ? saveTask : openEditor}>Add card</button>
    </>
  );
};

export default CardCreator;
