import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/Login/LoginPopup";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import VerifySubscription from "./pages/VerifySubscription/VerifySubscription";
import MySubscription from "./pages/MySubscription/MySubscription";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState("");

  console.log(userName);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <NavBar setShowLogin={setShowLogin} userName={userName} />
        <Routes>
          <Route
            path="/"
            element={
              <Home setShowLogin={setShowLogin} setUserName={setUserName} />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verifySubscription" element={<VerifySubscription />} />
          <Route path="/my-subscriptions" element={<MySubscription />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
