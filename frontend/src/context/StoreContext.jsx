import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");

  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }

    loadData();
  }, []);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const [food_list, setFoodList] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/admins"
        );
        setAdmins(response.data.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    }

    async function fetchFoodList() {
      try {
        const response = await axios.get(`${url}/api/admin/getAll`);
        setFoodList(response.data.data);
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    }

    fetchAdmins();
    fetchFoodList();
  }, []);

  const contextValue = {
    food_list,
    admins,
    url,
    token,
    setToken,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
