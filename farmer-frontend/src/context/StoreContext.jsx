import { React, createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [hasProcessingOrders, setHasProcessingOrders] = useState(false);

  const [food_list, setFoodList] = useState([]);

  const fetchItems = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/admin/get-items",
      {},
      { headers: { token } }
    );
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchItems();

      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    url,
    token,
    setToken,
    hasProcessingOrders,
    setHasProcessingOrders,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
