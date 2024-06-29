import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/Home/Home";
import MyProducts from "./pages/MyProducts/MyProducts";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Add from "./pages/Add/Add";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components//Sidebar/Sidebar";
import List from "./pages/List/List";
import { useContext } from "react";
import { StoreContext } from "../src/context/StoreContext";
import MyOrders from "./pages/MyOrders/MyOrders";
import Home from "./pages/Home/Home";
import AddSubscription from "./pages/AddSubscription/AddSubscription";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [adminName, setAdminName] = useState("");
  const url = "http://localhost:4000";
  const { token } = useContext(StoreContext);

  console.log(adminName);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} adminName={adminName} />
        <hr />
        <div className="app-content">
          {token ? <Sidebar /> : <></>}
          <Routes>
            <Route
              path="/"
              element={
                <Home setShowLogin={setShowLogin} setAdminName={setAdminName} />
              }
            ></Route>
            <Route path="/add" element={<Add url={url} />} />
            <Route
              path="/add-subscription"
              element={<AddSubscription url={url} />}
            />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<MyOrders url={url} />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
