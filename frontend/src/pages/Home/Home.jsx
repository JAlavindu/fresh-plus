import { React, useContext, useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header.jsx";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu.jsx";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay.jsx";
import AppDownload from "../../components/AppDownload/AppDownload.jsx";
import { StoreContext } from "../../context/StoreContext";

const Home = ({ setShowLogin }) => {
  const [category, setCategory] = useState("All");
  const { url, token, setToken } = useContext(StoreContext);

  return (
    <div>
      <Header setShowLogin={setShowLogin} />
      {!token ? (
        <div>
          {/* <button onClick={() => setShowLogin(true)}>Sign in</button> */}
        </div>
      ) : (
        <div>
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} />
        </div>
      )}

      <AppDownload />
    </div>
  );
};

export default Home;
