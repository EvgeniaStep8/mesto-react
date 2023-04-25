import { useEffect, useCallback } from "react";

const useEscapeKeydown = (close) => {
  const handleEscapeClose = useCallback(
    (event) => {
      if (event.key === "Escape") {
        close();
      }
    }, [close]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [handleEscapeClose]);
};

export default useEscapeKeydown;
