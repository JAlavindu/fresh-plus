import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import Modal from "react-modal";
import axios from "axios";

const NavBar = ({ setShowLogin, userName }) => {
  const [menu, setMenu] = useState("home");
  const { url, getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [modal1IsOpen, setModal1IsOpen] = useState(false);
  const [modal2IsOpen, setModal2IsOpen] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    oldPwd: "",
    newPwd: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const save = async (event) => {
    event.preventDefault();

    let saveData = {
      name: data.name,
      email: data.email,
      oldPwd: data.oldPwd,
      password: data.newPwd,
    };

    if (data.oldPwd && !data.newPwd) {
      try {
        let response = await axios.post(
          url + "/api/user/compare-pwd",
          { password: data.oldPwd },
          {
            headers: { token },
          }
        );

        if (response.data.success) {
          let response = await axios.post(
            url + "/api/user/update-user",
            saveData,
            {
              headers: { token },
            }
          );

          if (response.data.success) {
            alert(`${response.data.message}`);
          } else {
            alert(`${response.data.message}`);
          }
        } else {
          alert("Old password is wrong");
        }
      } catch (error) {
        alert("Old password is wrong");
      }
    } else if (!data.newPwd && !data.oldPwd) {
      try {
        let response = await axios.post(
          url + "/api/user/update-user",
          saveData,
          {
            headers: { token },
          }
        );

        if (response.data.success) {
          alert(`${response.data.message}`);
          window.location.reload("/");
        } else {
          alert(`${response.data.message}`);
        }
      } catch (error) {
        alert("Passwords don't match");
      }
    }
    window.location.reload("/");
  };

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/getUser",
        {},
        {
          headers: { token },
        }
      );
      setUser(response.data.data);

      setData({
        name: response.data.data.name,
        email: response.data.data.email,
        oldPwd: "",
        newPwd: "",
      });

      setModal1IsOpen(true);
    } catch (error) {
      console.error("Error fetching  user:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // useEffect(() => {
  //   fetchUserOnReload();
  // }, []);

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
                  fetchUser();
                }}
              >
                <img src={assets.profile_icon} alt="" />
                <p>Profile</p>
              </li>
              <hr />
              <li
                onClick={() => {
                  navigate("/myorders");
                }}
              >
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>

              {/* Modal 1 - Information */}
              <Modal
                isOpen={modal1IsOpen}
                onRequestClose={() => setModal1IsOpen(false)}
                className="modal"
                overlayClassName="modal-overlay"
              >
                <div className="modal-content">
                  <h2 className="modal-title">Your Information</h2>
                  <div className="delivery-info">
                    <p className="delivery-info-item">
                      Name: <b>{user.name}</b>
                    </p>
                    <p className="delivery-info-item">
                      Email: <b>{user.email}</b>
                    </p>

                    <button
                      className="modal-close-button"
                      onClick={() => {
                        setModal1IsOpen(false);
                        setModal2IsOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="modal-close-button"
                      onClick={() => setModal1IsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Modal>

              {/* Modal 2 - Edit Information */}
              <Modal
                isOpen={modal2IsOpen}
                onRequestClose={() => setModal2IsOpen(false)}
                className="modal"
                overlayClassName="modal-overlay"
              >
                <form onSubmit={save} className="place-order">
                  <div className="place-order-left">
                    <p className="title">Edit Information</p>
                    <div className="multi-fields">
                      <input
                        name="name"
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        placeholder="name"
                        required
                      />
                      <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="text"
                        placeholder="email"
                        required
                      />
                    </div>
                    <input
                      name="oldPwd"
                      onChange={onChangeHandler}
                      value={data.oldPwd}
                      type="text"
                      placeholder="old password"
                      required
                    />
                    <input
                      name="newPwd"
                      onChange={onChangeHandler}
                      value={data.newPwd}
                      type="text"
                      placeholder="new password"
                    />
                    <button className="modal-close-button" type="submit">
                      Save
                    </button>
                    <button
                      className="modal-close-button"
                      onClick={() => setModal2IsOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </Modal>

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
