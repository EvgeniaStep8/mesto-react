import React, { memo, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useInputsChange from "../hooks/useInputsChange";

const EditProfilePopup = memo(({ isOpen, onClose, onUpdateUser, isPending, setPending }) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange } = useInputsChange({
    name: "",
    about: "",
  });

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(true);
    onUpdateUser(values);
  };

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPending={isPending}
    >
      <input
        id="name-input"
        type="text"
        name="name"
        className="form__input form__input_type_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={values.name}
        onChange={handleChange}
      />
      <span id="name-input-error" className="form__input-error"></span>
      <input
        id="job-input"
        type="text"
        name="about"
        className="form__input form__input_type_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        value={values.about}
        onChange={handleChange}
      />
      <span id="job-input-error" className="form__input-error"></span>
    </PopupWithForm>
  );
});

export default EditProfilePopup;
