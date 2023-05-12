import React, { useEffect, memo } from "react";
import useInputsChange from "../hooks/useInputsChange";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = memo(({ isOpen, onClose, onAddCard, isPending, setPending }) => {
  const { values, setValues, handleChange } = useInputsChange({
    title: "",
    link: "",
  });

  useEffect(() => {
    setValues({ title: "", link: "" });
  }, [setValues, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(true);
    onAddCard(values);
  };

  return (
    <PopupWithForm
      name="add-card" 
      title="Новое место" 
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPending={isPending}
    >
      <input
        id="name-card-input"
        type="text"
        name="title"
        className="form__input form__input_type_title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.title}
        onChange={handleChange}
      />
      <span name="name-card-input-error" className="form__input-error"></span>
      <input
        id="link-input"
        type="url"
        name="link"
        className="form__input form__input_type_link"
        placeholder="Ссылка на картинку"
        required
        value={values.link}
        onChange={handleChange}
      />
      <span name="link-input-error" className="form__input-error"></span>
    </PopupWithForm>
  );
});

export default AddPlacePopup;
