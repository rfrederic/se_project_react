import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import "../../vendor/normalize.css";

import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import * as api from "../../utils/api";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import Profile from "../Profile/Profile";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { authorize, checkToken, register } from "../../utils/auth";

function App() {
  // Weather
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, city: "" },
  });

  // Modals
  const [activeModal, setActiveModal] = useState("");
  const closeActiveModal = () => setActiveModal("");

  // Cards
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(
    process.env.NODE_ENV === "production" ? defaultClothingItems : []
  );

  // Likes
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      api
        .addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item))
          );
        })
        .catch(console.error);
    } else {
      api
        .removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard.data : item))
          );
        })
        .catch(console.error);
    }
  };

  // Delete
  const [deleteModalId, setDeleteModalId] = useState(null);
  const handleDeleteItem = (itemId) => {
    api
      .deleteItem(itemId)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemId)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Temperature unit
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  // Auth / User
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  // Profile Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Card click
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  // Add item
  const handleAddClick = () => setActiveModal("add-garment");
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    api
      .addItem({ name, imageUrl, weather })
      .then((newItem) => {
        setClothingItems((previtems) => [newItem.data, ...previtems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  //Submit
  const handleSubmitRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then(({ name, _id, avatar }) => {
        // setCurrentUser({ name, _id, avatar });
        // setIsLoggedIn(true);
        handleSubmitLogin({ email, password });
        closeActiveModal();
      })
      .catch(console.error);
  };

  //Login
  const handleSubmitLogin = ({ email, password }) => {
    authorize({ email, password }).then(({ token }) => {
      localStorage.setItem("jwt", token);
      closeActiveModal();
      setIsLoggedIn(true);
    });
  };
  const handleUpdateUser = (data) => {
    const token = localStorage.getItem("jwt");
    api
      .updateUserInfo(data, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  // Register / Login handlers
  const handleRegisterClick = () => setActiveModal("register");
  const handleLoginClick = () => setActiveModal("login");

  // Load weather
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then(({ _id, name, avatar }) => {
          setCurrentUser({ _id, name, avatar });
          setIsLoggedIn(true);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  // Load clothing items
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      api
        .getItems()
        .then((data) =>
          setClothingItems(Array.isArray(data) ? data : data.items || [])
        )
        .catch(console.error);
    }
  }, []);

  // ESC close modal
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  // Protected Route
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) return <Navigate to="/" replace />;
    return children;
  };

  // implement Edit Profile modal and its functionality
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddNewClick={handleAddClick}
                      onEditProfileClick={() => setIsEditModalOpen(true)}
                      onSignOutClick={handleSignOut}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={(id) => setDeleteModalId(id)}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleSubmitRegister}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleSubmitLogin}
            />
            <ConfirmDeleteModal
              isOpen={!!deleteModalId}
              onClose={() => setDeleteModalId(null)}
              onConfirm={() => {
                handleDeleteItem(deleteModalId);
                setDeleteModalId(null);
              }}
            />
            <EditProfileModal
              isOpen={isEditModalOpen}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
