import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PopOutMenu = (props: any) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const clickHandler = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <button className={`${props.className} relative`} onClick={clickHandler}>
        <FontAwesomeIcon
          className="text-[#6b778c]"
          icon={["fas", "ellipsis"]}
        />
        {menuOpen && (
          <div className="absolute top-[100%] left-0 bg-white w-64 rounded-[3px] shadow-sm">
            <header className="py-1 text-center">List actions</header>
            <a className="block w-full py-1 text-[#172b4d]">Delete list</a>
          </div>
        )}
      </button>
    </>
  );
};

export default PopOutMenu;
