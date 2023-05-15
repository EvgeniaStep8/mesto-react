import React, { memo } from "react";
import logo from "../images/header__logo.svg";
import { useLocation, Link } from "react-router-dom";

const Header = memo(({ loggedIn, email, onLogoutClick }) => {
  let location = useLocation();
  const linkText = location.pathname === "/signup" ? "Войти" : "Регистрация";
  const linkPath = location.pathname === "/signup" ? "/signin" : "/signup";

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип место" />
      {loggedIn ? (
        <div className="header__info">
          <p className="header__email">{email}</p>
          <button
            className="header__logout-button"
            type="button"
            onClick={onLogoutClick}
          >
            Выйти
          </button>
        </div>
      ) : (
        <Link to={linkPath} className="header__link link" >{linkText}</Link>
      )}
    </header>
  );
});

export default Header;
