import React from "react";
import { Link } from "react-router-dom";

const Register = () => (
  <div className="authorization">
    <h1 className="authorization__title">Регистрация</h1>
    <form className="form">
      <input
        type="email"
        className="form__input form__input_theme_dark"
        name="login"
        placeholder="Email"
        required
      />
      <span id="login-input-error" className="form__input-error"></span>
      <input
        type="password"
        className="form__input form__input_theme_dark"
        name="password"
        placeholder="Пароль"
        required
      />
      <span id="password-input-error" className="form__input-error"></span>
      <button className="form__submit-button form__submit-button_type_authorization">
        Зарегистрироваться
      </button>
    </form>
    <p className="authorization__info">
			  Уже зарегистрированы? <Link className="link" to="/signin" >Войти</Link>
			</p>
  </div>
);

export default Register;
