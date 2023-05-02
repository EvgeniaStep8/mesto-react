import React from "react";

const Login = () => {
  return (
		<div className="authorization">
			<h1>Регистрация</h1>
			<form className="authorization__form">
				<input
				  type="email"
				  className="popup__input"
					placeholder="Email"
				/>
				<input
				  type="password"
					className="popup__input"
					placeholder="Пароль"
				/>
				<button className="authorization__submit-button">
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