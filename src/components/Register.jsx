import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInputsChange from "../hooks/useInputsChange";
import auth from "../utils/auth";

const Register = () => {
  const { values, setValues, handleChange } = useInputsChange({
    email: "",
    password: "",
  });
  const [isPending, setPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(true);
    auth.register(values)
      .then(() => navigate('/signin', {replace: true}))
      .catch((err) => console.log(err))
      .finally(() => setPending(false));
  }

  return (
    <div className="authorization">
      <h1 className="authorization__title">Регистрация</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="form__input form__input_theme_dark"
          name="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <span id="login-input-error" className="form__input-error"></span>
        <input
          type="password"
          className="form__input form__input_theme_dark"
          name="password"
          placeholder="Пароль"
          required
          value={values.password}
          onChange={handleChange}
        />
        <span id="password-input-error" className="form__input-error"></span>
        <button className="form__submit-button form__submit-button_type_authorization">
          {isPending ? "Зарегистрироваться..." : "Зарегистрироваться"}
        </button>
      </form>
      <p className="authorization__info">
        Уже зарегистрированы? <Link className="link" to="/signin">
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
