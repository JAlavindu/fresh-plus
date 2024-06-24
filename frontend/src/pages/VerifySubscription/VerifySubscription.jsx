import React, { useContext, useEffect } from "react";
import "./VerifySubscription.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const VerifySubscription = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const subscriptionId = searchParams.get("subscriptionId");
  const userId = searchParams.get("user");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifySubscription = async () => {
    const response = await axios.post(
      url + "/api/subscription/verify-subscription",
      {
        success,
        subscriptionId,
        userId,
      }
    );

    if (response.data.success) {
      navigate("/my-subscriptions");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifySubscription();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default VerifySubscription;
