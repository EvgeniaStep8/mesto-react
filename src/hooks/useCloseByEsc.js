import { useEffect } from 'react';

const useCloseByEscape = (closePopup) => {
  const handleEscapeClose = (event) => {
    if (event.key === 'Escape') {
      closePopup();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClose);

    return () => document.removeEventListener('keydown', handleEscapeClose);
  })
}

export default useCloseByEscape;