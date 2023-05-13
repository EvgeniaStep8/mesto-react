import React, { memo } from "react";
import logo from "../images/header__logo.svg";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Header = memo(({ loggedIn, email }) => {
  let location = useLocation();
  const navigate = useNavigate();
  const linkText = location.pathname === "/signup" ? "Войти" : "Регистрация";
  const linkPath = location.pathname === "/signup" ? "/signin" : "/signup";

  const handleExitClick = () => {
    localStorage.removeItem('token');
    navigate("/signin");
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип место" />
      {loggedIn ? (
        <div className="header__info">
          <p className="header__email">{email}</p>
          <button
            className="header__exit-button"
            type="button"
            onClick={handleExitClick}
          >
            Выйти
          </button>
        </div>
      ) : (
        <Link to={linkPath} >{linkText}</Link>
      )}
    </header>
  );
});

export default Header;
