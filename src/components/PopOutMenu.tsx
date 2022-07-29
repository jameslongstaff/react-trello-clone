import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useOutsideAlerter from "../hooks/useOutsideAlerter";

export type PopoutMenuItemType = {
  fn?: () => void;
  title: string;
};

const PopOutMenu = (props: any) => {
  const wrapperRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useOutsideAlerter(wrapperRef, () => {
    setMenuOpen(false);
  });

  const clickHandler = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <a
        ref={wrapperRef}
        className={`${props.className} relative cursor-pointer hover:bg-[#091e4214] px-2 rounded-[3px]`}
        onClick={clickHandler}
      >
        <FontAwesomeIcon
          className="text-[#6b778c]"
          icon={["fas", "ellipsis"]}
        />
        {menuOpen && (
          <div className="absolute text-sm top-[100%] left-0 bg-white w-64 rounded-[3px] shadow-sm">
            <header className="py-2 text-center text-[#5e6c84]">
              List actions
            </header>

            {props.items.map((item: PopoutMenuItemType, index: number) => {
              return (
                <a
                  key={index}
                  onClick={item.fn}
                  className="text-left block w-full py-2 px-3 text-[#172b4d] hover:bg-[#091e420a]"
                >
                  {item.title}
                </a>
              );
            })}
          </div>
        )}
      </a>
    </>
  );
};

export default PopOutMenu;
