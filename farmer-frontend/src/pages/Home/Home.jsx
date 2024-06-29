import React, { useContext, useEffect } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import Fooddisplay from "../../components/Fooddisplay/Fooddisplay";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import List from "../List/List";
import axios from "axios";

const Home = ({ setShowLogin, setAdminName }) => {
  const { url, token, setToken, hasProcessingOrders, setHasProcessingOrders } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/admin-orders", {
        headers: { token },
      });
      setHasProcessingOrders(
        response.data.data.some((order) => order.status === "Processing")
      );
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="home">
      <Header setAdminName={setAdminName} />
      {!token ? (
        <div>
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate("/orders")}>
            View Orders
            {hasProcessingOrders && <span className="green-dot"></span>}
          </button>
          <button onClick={() => navigate("/add")}>Add Item</button>
        </div>
      )}
    </div>
  );
};

export default Home;
