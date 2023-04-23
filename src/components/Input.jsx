import React from "react";

export default function Input({type, id, name, placeholder, maxLength, minLength}) {
  return (
    <>
      <input
			  type={type || 'text'}
        id={id}
        name={name}
        className="popup__input"
        placeholder={placeholder}
        minLength={minLength || null}
        maxLength={maxLength || null}
        required
      />
      <span id={`${name}InputError`} className="popup__input-error"></span>
    </>
  );
}
