import { useEffect, useRef } from "react";

const OutSideClick = (handler) => {
  const domNode = useRef();

  useEffect(() => {
    let maybeHandler = (e) => {
      if (domNode.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

export default OutSideClick;
