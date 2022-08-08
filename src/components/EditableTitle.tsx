import React, { useRef, useState } from "react";
import useInputFocus from "../hooks/useInputFocus";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

type TagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export type EditableTitleType = {
  title: string;
  onSave?: (title: string) => void;
  className?: string;
  spacingClass?: string;
  tag: TagType;
};

const EditableTitle = (props: EditableTitleType) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [newTitle, setNewTitle] = useState("");
  const [originalTitle, setOriginalTitle] = useState(props.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleClickOutside = () => {
    if (isEditing) {
      handleSave();
      cancelEditMode();
    }
  };

  useInputFocus(inputRef, isEditing);

  useOutsideAlerter(wrapperRef, handleClickOutside, [newTitle, isEditing]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEditing && event.key === "Enter") {
      handleSave();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleClick = () => {
    initEditMode();
  };

  const handleSave = () => {
    if (newTitle !== originalTitle) {
      if (newTitle !== "") {
        setOriginalTitle(newTitle);

        if (props.onSave) {
          props.onSave(newTitle);
        }
      } else {
        setNewTitle(originalTitle);
      }
    }

    cancelEditMode();
  };

  const initEditMode = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const cancelEditMode = () => {
    setIsEditing(false);
  };

  const Tag = `${props.tag}` as TagType;

  return (
    <div ref={wrapperRef} onClick={handleClick} className="w-full">
      <Tag className={`${props.className} cursor-pointer ${!isEditing && props.spacingClass}`}>
        {isEditing ? (
          <input
            className={`w-full ${props.spacingClass} text-black`}
            type="text"
            defaultValue={props.title}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            ref={inputRef}
          />
        ) : (
          props.title
        )}
      </Tag>
    </div>
  );
};

export default EditableTitle;
