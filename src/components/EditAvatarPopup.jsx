import React, { memo, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useInputsChange from "../hooks/useInputsChange";

const EditAvatarPopup = memo(({ isOpen, onClose, onUpdateAvatar, isPending, setPending }) => {
  const { values, setValues, handleChange } = useInputsChange({ avatar: "" });

  useEffect(() => {
    setValues({ avatar: "" });
  }, [setValues, isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(true);
    onUpdateAvatar(values);
  };

  return (
    <PopupWithForm
      name="update-avatar" 
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPending={isPending}
    >
      <input
        id="link-avatar-input"
        type="url"
        name="avatar"
        className="form__input form__input_type_link"
        placeholder="Ссылка на картинку профиля"
        required
        value={values.avatar}
        onChange={handleChange}
      />
      <span id="link-avatar-input-error" className="form__input-error"></span>
    </PopupWithForm>
  );
});

export default EditAvatarPopup;
