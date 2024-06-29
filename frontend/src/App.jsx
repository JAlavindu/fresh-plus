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
import ProductInfo from "./components/ProductInfo/ProductInfo";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [adminName, setAdminName] = useState("");

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
          <Route path="/product-info/:id" element={<ProductInfo />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
