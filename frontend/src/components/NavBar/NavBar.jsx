import React, { useContext, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { token, setToken, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      {/* logo */}
      <div className="image">
        <Link to="/">
          <img src={assets.logo} alt="logo" className="logo" />
        </Link>
      </div>

      <ul className="navbar-menu">
        <Link
          to="/"
          className={menu === "home" ? "active" : ""}
          onClick={() => setMenu("home")}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "menu" ? "active" : ""}
          onClick={() => setMenu("menu")}
        >
          About Us
        </a>
        <a
          href="#app-download"
          className={menu === "mobile-app" ? "active" : ""}
          onClick={() => setMenu("mobile-app")}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          className={menu === "contact-us" ? "active" : ""}
          onClick={() => setMenu("contact-us")}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt="search"
          className="navbar-search-icon"
        />
        <div className="navbar-right">
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <div>
              <Link to="/cart">
                <img src={assets.basket_icon} alt="cart" />
              </Link>
              <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
              <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" srcset="" />
                <ul className="navbar-profile-dropdown">
                  <li onClick={logout}>
                    <img src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
