import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Header = ({ setAdminName }) => {
  const { url, token, setToken } = useContext(StoreContext);

  const [admin, setAdmin] = useState("");

  // API call
  const fetchAdminName = async () => {
    const response = await axios.get(url + "/api/admin/name", {
      headers: { token },
    });

    setAdmin(response.data.data.name);
    setAdminName(response.data.data.name);
    // console.log(response.data.data.name);
  };

  useEffect(() => {
    if (token) {
      fetchAdminName();
    }
  }, [token]);

  return (
    <div>
      <div className="header-contents">
        {!token ? <h2>Welcome Farmer!</h2> : <h2>Welcome {admin} !</h2>}

        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
          deleniti vel perspiciatis, iure laborum necessitatibus odit vitae
          nihil voluptatum dolorem!
        </p>
      </div>
    </div>
  );
};

export default Header;
