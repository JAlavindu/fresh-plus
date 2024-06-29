import React, { useContext, useEffect, useState } from "react";
import "./SubscriptionPlan.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const SubscriptionPlan = () => {
  const { token, url } = useContext(StoreContext);
  const [subscriptions, setSubscriptions] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);
  const navigate = useNavigate();

  // Fetch all subscriptions
  const getAllSubscriptions = async () => {
    try {
      const response = await axios.get(
        `${url}/api/subscription/get-subscriptions`
      );
      setSubscriptions(response.data.data);
    } catch (error) {
      console.error("Error in fetching subscriptions", error);
    }
  };

  // Fetch user's enrolled subscriptions
  const fetchMySubscriptions = async () => {
    try {
      const response = await axios.post(
        `${url}/api/subscription/user-subscriptions`,
        {},
        { headers: { token } }
      );
      setUserSubscriptions(response.data.data);
    } catch (error) {
      console.error("Error in fetching user subscriptions", error);
    }
  };

  // Handle purchase of a subscription
  const handlePurchase = async (subscriptionId, price, name) => {
    try {
      const response = await axios.post(
        `${url}/api/subscription/new-subscription`,
        {
          subscriptionId: subscriptionId,
          amount: price,
          name: name,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        window.location.href = response.data.session_url;
      } else {
        console.error("Failed to create subscription session");
      }
    } catch (error) {
      console.error("Error in creating subscription session", error);
    }
  };

  useEffect(() => {
    getAllSubscriptions();
    fetchMySubscriptions();
  }, []);

  // Function to check if a subscription is enrolled by the user
  const isEnrolled = (subscriptionId) => {
    return userSubscriptions.some((sub) => sub._id === subscriptionId);
  };

  return (
    <div className="explore-menu">
      <h1>Explore Subscriptions</h1>
      <div className="subs-container">
        {subscriptions.map((subscription) => (
          <div className="subscription-plan" key={subscription._id}>
            <div className="explore-menu-list-item">
              <div className="subscription-details">
                <h2>{subscription.name} Subscription</h2>
                <p>From {subscription.adminName} Store</p>
                <p>{subscription.description}</p>
                <p>Valid for {subscription.validity} days</p>
                <p>Rs.{subscription.price}.00</p>
              </div>
              <div className="subscription-button">
                {isEnrolled(subscription._id) ? (
                  <button className="activeBtn" disabled>
                    Active{" "}
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handlePurchase(
                        subscription._id,
                        subscription.price,
                        subscription.name
                      )
                    }
                  >
                    Purchase Plan
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default SubscriptionPlan;
