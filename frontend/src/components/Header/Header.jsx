import { React, useContext, useState, useEffect } from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ({ setShowLogin, setUserName }) => {
  const { url, token, setToken } = useContext(StoreContext);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // API call
  const fetchUserName = async () => {
    const response = await axios.post(
      url + "/api/user/name",
      {},
      {
        headers: { token },
      }
    );

    setUser(response.data.data.name);
    setUserName(response.data.data.name);
    // console.log(response.data.data.name);
  };

  useEffect(() => {
    if (token) {
      fetchUserName();
    }
  }, [token]);

  return (
    <div className="header">
      {/* <div className="header-image">
          <img src={assets.header_img} alt=""/>
        </div> */}
      <div className="header-contents">
        {!token ? (
          <div>
            <h2>Welcome !</h2>
          </div>
        ) : (
          <div>
            <h2>Welcome {user || "user"} !</h2>
          </div>
        )}
        <h3>Fresh vegetables for you.</h3>
        {token ? (
          <button onClick={() => navigate("/myOrders")} className="btn-header">
            My Orders
          </button>
        ) : (
          <button className="btn-header" onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
