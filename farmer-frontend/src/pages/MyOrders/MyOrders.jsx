import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./MyOrders.css";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../context/StoreContext";

const MyOrders = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(StoreContext);

  // API call
  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/admin-orders", {
      headers: { token },
    });

    setData(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  //   const removeItem = (itemId) => {
  //     // Logic to remove item
  //     console.log(`Remove item with id: ${itemId}`);
  //   };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>Rs.{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Deliver Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
