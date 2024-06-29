import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [admins, setAdmins] = useState({});

  // API call to fetch orders
  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );

    const orders = response.data.data;
    setData(orders);

    // Fetch admin names for each order
    const adminPromises = orders.map((order) => fetchAdmin(order.adminId));
    const adminResults = await Promise.all(adminPromises);

    const adminMap = {};
    adminResults.forEach((admin) => {
      if (admin) {
        adminMap[admin._id] = admin.name;
      }
    });
    setAdmins(adminMap);
  };

  // API call to fetch admin details
  const fetchAdmin = async (adminId) => {
    try {
      const response = await axios.post(
        url + "/api/admin/get-admin",
        { adminId },
        { headers: { token } }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching admin:", error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          const adminName = admins[order.adminId] || "Loading...";
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity + " kg";
                  } else {
                    return item.name + " x " + item.quantity + " kg,  ";
                  }
                })}
              </p>
              <p>{adminName}</p>
              <p>Rs.{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
