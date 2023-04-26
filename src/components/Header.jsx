import React, { memo } from "react";
import logo from "../images/header__logo.svg";

const Header = memo(() => (
  <header className="header">
    <img className="header__logo" src={logo} alt="Логотип место" />
  </header>
));

export default Header;