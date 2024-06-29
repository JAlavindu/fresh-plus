import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./MyOrders.css";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../context/StoreContext";
import Modal from "react-modal";
import formatDateTime from "../../utils/formatDateTime";

const MyOrders = ({ url }) => {
  const [data, setData] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

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

  // API call to fetch orders
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.post(
        url + "/api/subscription/admin-subscriptions",
        {},
        {
          headers: { token },
        }
      );
      setSubscriptions(response.data.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
      fetchSubscriptions();
    }
  }, [token]);

  // Calculate delivery info
  const calculateDeliveryInfo = async (orderId) => {
    try {
      const response = await axios.post(
        `${url}/api/admin/delivery`,
        { orderId },
        { headers: { token } }
      );
      setDeliveryInfo(response.data.data);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching delivery info:", error);
    }
  };

  const confirmOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to confirm this order?"
    );

    if (confirmed) {
      const response = await axios.post(`${url}/api/order/confirm-order`, {
        orderId,
      });
      window.location.reload();
    }
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          const { date, time } = formatDateTime(order.date);
          return (
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
              <p>{date}</p>
              <p>Destination: {order.address.city}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button
                className={`button ${
                  order.status === "On Delivery"
                    ? "order-delivered"
                    : "deliver-order"
                }`}
                onClick={() => calculateDeliveryInfo(order._id)}
                disabled={order.status === "On Delivery"}
              >
                {order.status === "On Delivery"
                  ? "On Delivery"
                  : "Confirm Order"}
              </button>
            </div>
          );
        })}
      </div>
      <br />
      <br />
      <h2>My Subscriptions</h2>
      <br />
      <div className="subscription-container">
        {subscriptions
          .filter((subscription) => subscription.users.length > 0)
          .map((subscription, index) => {
            const { date, time } = formatDateTime(subscription.date);
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                <p>{subscription.name}</p>
                <p>Items: {subscription.description}</p>
                <p>Rs.{subscription.price}.00</p>
                <p>{date}</p>
                <p>{subscription.validityDescription}</p>
                <p>
                  <span>&#x25cf;</span>{" "}
                  <b>{subscription.validity} days validity</b>
                </p>
                <div className="subscription-users">
                  <h3>Subscribed Users:</h3>
                  {subscription.users.map((userId, userIndex) => (
                    <p key={userIndex}>User ID: {userId}</p>
                  ))}
                </div>
                {/* <button onClick={() => calculateDeliveryInfo(subscription._id)}>
                  Confirm Subscription
                </button> */}
              </div>
            );
          })}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <h2 className="modal-title">Delivery Info</h2>
          {deliveryInfo ? (
            <div className="delivery-info">
              <p className="delivery-info-item">
                From: {deliveryInfo.adminCity}
              </p>
              <p className="delivery-info-item">To: {deliveryInfo.orderCity}</p>
              <p className="delivery-info-item">
                Distance: {deliveryInfo.distance} km
              </p>
              <p className="delivery-info-item">
                Delivery Fee: Rs. {Math.round(deliveryInfo.deliveryFee - 200)}
                .00
              </p>
              <button
                className="modal-confirm-button"
                onClick={() => confirmOrder(deliveryInfo.order._id)}
              >
                Confirm Order
              </button>
              <button
                className="modal-close-button"
                onClick={() => setModalIsOpen(false)}
              >
                Close
              </button>
            </div>
          ) : (
            <p className="loading">Loading...</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default MyOrders;
