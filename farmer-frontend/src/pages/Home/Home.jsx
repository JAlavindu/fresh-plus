import React, { useContext } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Fooddisplay from "../../components/Fooddisplay/Fooddisplay";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import List from "../List/List";

const FarmHome = ({ setShowLogin, setAdminName }) => {
  const { url, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="home">
      <Header setAdminName={setAdminName} />
      {!token ? (
        <div>
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate("/orders")}>View Orders</button>
          <button onClick={() => navigate("/add")}>Add Item</button>
        </div>
      )}
    </div>
  );
};

export default FarmHome;
