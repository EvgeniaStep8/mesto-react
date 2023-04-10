import React from "react";

export default function Input(props) {
  return (
    <>
      <input
        id={`${props.name}-input`}
        type={props.type}
        name={props.name}
        className="popup__input"
        placeholder={props.placeholder}
        required
      />
      <span
        id={`${props.name}-input-error`}
        className="popup__input-error"
      ></span>
    </>
  );
}