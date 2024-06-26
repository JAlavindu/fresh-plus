import { React, useContext, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header.jsx";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";
import { StoreContext } from "../../context/StoreContext";
import AboutUs from "../../components/AboutUs/AboutUs.jsx";
import Details from "../../components/Details/Details.jsx";
import HowItWorks from "../../components/HowItWorks/HowItWorks.jsx";
import SubscriptionPlan from "../../components/SubscriptionPlan/SubscriptionPlan .jsx";

const Home = ({ setShowLogin, setUserName }) => {
  const [category, setCategory] = useState("All");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const { url, token, setToken } = useContext(StoreContext);
  const [clickedAll, setClickedAll] = useState(false);

  return (
    <div>
      <Header setShowLogin={setShowLogin} setUserName={setUserName} />

      {!token ? (
        <div>
          {/* <button onClick={() => setShowLogin(true)}>Sign in</button> */}
          <Details />
          <HowItWorks />
          <AboutUs />
          <AppDownload />
        </div>
      ) : (
        <div>
          <SubscriptionPlan />
          <ExploreMenu
            setSelectedAdmin={setSelectedAdmin}
            setClickedAll={setClickedAll}
          />
          <FoodDisplay selectedAdmin={selectedAdmin} clickedAll={clickedAll} />
        </div>
      )}
    </div>
  );
};

export default Home;
