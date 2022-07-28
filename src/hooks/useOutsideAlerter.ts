import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
const useOutsideAlerter = (ref: any, fn: any, d?: any[]) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref].concat(d));

  return [];
};

export default useOutsideAlerter;
