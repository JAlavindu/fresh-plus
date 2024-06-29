import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./MySubscription.css";
import formatDateTime from "../../utils/formatDateTime";
import addDays from "../../utils/addDays";

const MySubscription = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  // API call
  const fetchUserSubscriptions = async () => {
    const response = await axios.post(
      url + "/api/subscription/user-subscriptions",
      {},
      { headers: { token } }
    );

    setData(response.data.data);
    // console.log(response.data.data);
  };

  const cancelUserSubscriptions = async (subscriptionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this subscription?"
    );

    if (confirmed) {
      const response = await axios.post(
        url + "/api/subscription/remove-subscription",
        { subscriptionId: subscriptionId },
        { headers: { token } }
      );
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserSubscriptions();
    }
  }, [token, data]);

  return (
    <div className="my-subscriptions">
      <h2>My Subscriptions</h2>
      <div className="container">
        {data.map((subscription, index) => {
          const { date, time } = formatDateTime(subscription.date);
          const newDate = addDays(subscription.date, subscription.validity);

          return (
            <div key={index} className="my-subscriptions-subscription">
              {/* <img src={assets.parcel_icon} alt="" /> */}
              <p>{subscription.name} Subscription</p>
              <p>From {subscription.adminName} Store</p>
              <p>Rs.{subscription.price}.00</p>
              <p>
                <span>&#x25cf;</span>Activated:{" "}
                <b>
                  <span>{date}</span>
                </b>
              </p>
              <p>
                <span>&#x25cf;</span>Valid until:{" "}
                <b>
                  <span>{newDate}</span>
                </b>
              </p>
              <button onClick={() => cancelUserSubscriptions(subscription._id)}>
                Cancel Subscription
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MySubscription;
