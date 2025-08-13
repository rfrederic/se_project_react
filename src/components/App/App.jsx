import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "../../vendor/normalize.css";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnit";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, city: "" },
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(
    process.env.NODE_ENV === "production" ? defaultClothingItems : []
  );
  const [currentTemperatureUnit, setcurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setcurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");
  const closeActiveModal = () => setActiveModal("");

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  const handleAddItemModalSubmit = ({ name, ImageUrl, weather }) => {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    setClothingItems([
      { name, libk: ImageUrl, weather, _id: newId },
      ...clothingItems,
    ]);
    closeActiveModal();
  };
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      getItems()
        .then((data) => setClothingItems(data.items || []))
        .catch(console.error);
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          <Footer />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            OnAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
