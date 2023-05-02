import React from "react";

const Login = () => {
  return (
		<div className="authorization">
			<h1 className="authorization__title">Регистрация</h1>
			<form className="form">
				<input
				  type="email"
				  className="form__input"
					placeholder="Email"
				/>
				<input
				  type="password"
					className="form__input"
					placeholder="Пароль"
				/>
				<button className="form__submit-button form__submit-button_type_authorization">
				  Зарегистрироваться
				</button>
			</form>
			<p className="authorization__info">
			  Уже зарегистрированы? Войти
			</p>
		</div>
	)
}

export default Login;