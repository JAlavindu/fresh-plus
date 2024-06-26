import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./MyOrders.css";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../context/StoreContext";
import Modal from "react-modal";

const MyOrders = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(StoreContext);

  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  // API call to fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/admin-orders", {
        headers: { token },
      });
      setData(response.data.data);
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

  // Calculate delivery info
  const calculateDeliveryInfo = async (orderCity) => {
    try {
      const response = await axios.post(
        `${url}/api/admin/delivery`,
        { orderCity },
        { headers: { token } }
      );
      setDeliveryInfo(response.data.data);
      console.log(deliveryInfo);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching delivery info:", error);
    }
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order.items.map((item, index) =>
                index === order.items.length - 1
                  ? item.name + " x " + item.quantity
                  : item.name + " x " + item.quantity + ", "
              )}
            </p>
            <p>Rs.{order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>destination: {order.address.city}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={() => calculateDeliveryInfo(order.address.city)}>
              Deliver Order
            </button>
          </div>
        ))}
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Delivery Info</h2>
        {deliveryInfo ? (
          <div>
            <p>Distance: {deliveryInfo.distance} km</p>
            <p>Delivery Fee: ${deliveryInfo.deliveryFee}</p>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};

export default MyOrders;
