import { useEffect } from "react";

type AllowedRefType = React.RefObject<HTMLTextAreaElement> | React.RefObject<HTMLInputElement>;

const useInputFocus = (ref: AllowedRefType, focusWhen: boolean) => {
  useEffect(() => {
    return () => {
      if (ref?.current) {
        ref.current.focus();
        ref.current.select();
      }
    };
  }, [focusWhen]);
};

export default useInputFocus;
