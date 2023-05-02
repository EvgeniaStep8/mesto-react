import React from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import handleOverlayClick from "../utils/utils";

const PopupWithForm = ({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isPending,
  children
}) => {
  const classNamePopup = `popup ${isOpen ? "popup_opened" : ""}`;

  useEscapeKeydown(onClose, isOpen);
  const handleCloseByOverlayClick = handleOverlayClick(onClose);

  return (
    <div
      className={classNamePopup}
      id={`popup-${name}`}
      onClick={handleCloseByOverlayClick}
    >
      <div className="popup__container"> 
        <h2 className="popup__title">{title}</h2> 
        <form className="popup__form" name={`form${name}`} onSubmit={onSubmit}> 
          {children} 
          <button className="popup__save-button" type="submit"> 
            {isPending ? (buttonText ?  buttonText + '...' : 'Сохранить...') : (buttonText || 'Сохранить')} 
          </button> 
        </form> 
        <button 
          className="popup__close" 
          type="button" 
          onClick={onClose} 
        ></button> 
      </div> 
    </div> 

  );
};
export default PopupWithForm;
