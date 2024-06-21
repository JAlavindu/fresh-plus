import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin, adminName }) => {
  const [menu, setMenu] = useState("home");
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="" />
      <ul className="navbar-menu">
        <li
          onClick={() => {
            setMenu("home");
            navigate("/");
          }}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </li>
        <li
          onClick={() => setMenu("contactus")}
          className={menu === "contactus" ? "active" : ""}
        >
          Contact us
        </li>
      </ul>
      <div className="navbar-right">
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" srcset="" />
            <ul className="navbar-profile-dropdown">
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      {token ? (
        adminName ? (
          <p>Hello {adminName} !</p>
        ) : (
          <p>Hello user !</p>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
