import React from "react";
import useInputsChange from "../hooks/useInputsChange";

const Login = ({ onSubmit, isPending, setPending }) => {
	const { values, setValues, handleChange } = useInputsChange({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setPending(true);
    onSubmit(values);
  }
	
  return (
		<div className="authorization">
			<h1 className="authorization__title">Вход</h1>
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
				  {isPending ? "Войти..." : "Войти"}
				</button>
			</form>
		</div>
	)
}

export default Login;