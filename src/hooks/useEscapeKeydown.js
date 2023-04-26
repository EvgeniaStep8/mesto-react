import { useEffect, useCallback } from "react";

const useEscapeKeydown = (close, isOpen) => {
  const handleEscapeClose = useCallback(
    (event) => {
      if (event.key === "Escape") {
        close();
      }
    }, [close]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeClose);
      return () => {
        document.removeEventListener("keydown", handleEscapeClose);
      };
    }
  }, [handleEscapeClose, isOpen]);
};

export default useEscapeKeydown;
