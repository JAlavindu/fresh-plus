import { React, useContext, useState, useEffect } from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Header = ({ setShowLogin }) => {
  const { url, token, setToken } = useContext(StoreContext);
  const [user, setUser] = useState("");

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
        <h3>Fresh vegetables for you.</h3>
        {!token ? (
          <div>
            <h2>Welcome guest !</h2>
            <button className="signin" onClick={() => setShowLogin(true)}>
              Sign in
            </button>
          </div>
        ) : (
          <div>
            <h2>Welcome {user || "user"} !</h2>
            <button>View Menu</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
