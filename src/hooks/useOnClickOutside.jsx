import { useEffect } from "react";

export default function useOnclickOutside(ref, handler) {
  useEffect(() => {
    const listener = () => {
      //모달 안을 클릭했는지
      console.log(event.target);
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      //모달 밖을 클릭했는지
      handler();
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
