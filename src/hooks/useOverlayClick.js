import { useCallback } from "react";

const useOverlayClick = (close) => {
	return useCallback((event) => {
		if (event.target===event.currentTarget) {
			close();
		}
	}, [close]);
}

export default useOverlayClick;