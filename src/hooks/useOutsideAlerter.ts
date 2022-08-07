import { useEffect } from "react";

const useOutsideAlerter = (ref: any, fn: any, deps?: any[]) => {
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
  }, [ref].concat(deps));

  return [];
};

export default useOutsideAlerter;
