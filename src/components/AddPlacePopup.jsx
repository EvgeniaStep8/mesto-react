import React, { useState, memo } from "react";
import useEscapeKeydown from "../hooks/useEscapeKeydown";
import useInputsChange from "../hooks/useInputsChange"
import handleOverlayClick from "../utils/utils";

const AddPlacePopup = memo(
  ({ isOpen, onClose, onAddCard }) => {
    const classNamePopup =  `popup ${isOpen ? "popup_opened" : ""}`;

    const { values, setValues, handleChange } = useInputsChange({ title: "", link: "" });
    const [isPending, setPending] = useState(false);

    const handleClose = () => {
      onClose();
      setValues({ title: "", link: "" });
    }

    const handleSubmit = 
      (event) => {
        event.preventDefault();
        setPending(true);
        onAddCard(values).finally(() => {
          setValues({ title: "", link: "" })
          setPending(false);
        });
      }

    useEscapeKeydown(handleClose, isOpen);
    const handleCloseByOverlayClick = handleOverlayClick(onClose);

    return (
      <div
        className={classNamePopup}
        id="popup-add"
        onClick={handleCloseByOverlayClick}
      >
        <div className="popup__container">
          <h2 className="popup__title">Новое место</h2>
          <form
            className="popup__form"
            name="popupAddForm"
            onSubmit={handleSubmit}
          >
            <input
              id="name-card-input"
              type="text"
              name="title"
              className="popup__input popup__input_type_title"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
              value={values.title}
              onChange={handleChange}
            />
            <span
              name="name-card-input-error"
              className="popup__input-error"
            ></span>
            <input
              id="link-input"
              type="url"
              name="link"
              className="popup__input popup__input_type_link"
              placeholder="Ссылка на картинку"
              required
              value={values.link}
              onChange={handleChange}
            />
            <span name="link-input-error" className="popup__input-error"></span>
            <button className="popup__save-button" type="submit">
              {isPending ? "Создать..." : "Создать"}
            </button>
          </form>
          <button
            className="popup__close"
            type="button"
            onClick={handleClose}
          ></button>
        </div>
      </div>
    );
  }
);

export default AddPlacePopup;
