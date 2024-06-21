import { React, useContext, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header.jsx";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";
import { StoreContext } from "../../context/StoreContext";

const Home = ({ setShowLogin, setUserName }) => {
  const [category, setCategory] = useState("All");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const { url, token, setToken } = useContext(StoreContext);

  return (
    <div>
      <Header setShowLogin={setShowLogin} setUserName={setUserName} />

      {!token ? (
        <div>
          {/* <button onClick={() => setShowLogin(true)}>Sign in</button> */}
        </div>
      ) : (
        <div>
          <ExploreMenu setSelectedAdmin={setSelectedAdmin} />
          <FoodDisplay selectedAdmin={selectedAdmin} />
        </div>
      )}

      <AppDownload />
    </div>
  );
};

export default Home;
