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

  const addToCart = (itemId, weight) => {
    const key = `${itemId}-${weight}`;
    setCartItems((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1, // Increment the quantity for the selected weight
    }));
  };

  const removeFromCart = (itemId, weight) => {
    const key = `${itemId}-${weight}`;
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[key] > 1) {
        newCartItems[key] -= 1;
      } else {
        delete newCartItems[key];
      }
      return newCartItems;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const key in cartItems) {
      const [itemId, weight] = key.split("-");
      const itemInfo = food_list.find((product) => product._id === itemId);
      if (itemInfo) {
        const weightInKg = weight / 1000; // Convert weight from grams to kilograms
        totalAmount += itemInfo.price * weightInKg * cartItems[key];
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
