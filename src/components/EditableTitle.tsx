import React, { useCallback, useEffect, useRef, useState } from "react";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

type TagType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

const EditableTitle = (props: any) => {
  const wrapperRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleClickOutside = useCallback(() => {
    handleSave();
    cancelEditMode();
  }, []);

  useOutsideAlerter(wrapperRef, handleClickOutside);

  useEffect(() => {
    if (!!inputRef && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEditing) {
      if (event.key === "Enter") {
        handleSave();
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const handleClick = () => {
    initEditMode();
  };

  const handleSave = () => {
    if (props.onSave) {
      props.onSave();
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
    <div ref={wrapperRef} onClick={handleClick}>
      <Tag className={props.className}>
        {isEditing ? (
          <input
            className="w-full"
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
