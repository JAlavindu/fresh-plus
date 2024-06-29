import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const NavBar = ({ setShowLogin, userName }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

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
          Home
        </Link>
        {token ? (
          <></>
        ) : (
          <>
            <a
              href="#about-us"
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
              Mobile-app
            </a>
          </>
        )}

        <a
          href="#footer"
          className={menu === "contact-us" ? "active" : ""}
          onClick={() => setMenu("contact-us")}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img
          src={assets.search_icon}
          alt="search"
          className="navbar-search-icon"
        />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" srcSet="" />
            <ul className="navbar-profile-dropdown">
              <li
                onClick={() => {
                  navigate("/myorders");
                }}
              >
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      {token ? userName ? <p>Hello {userName} !</p> : <p>Hello user !</p> : ""}
    </div>
  );
};

export default NavBar;
