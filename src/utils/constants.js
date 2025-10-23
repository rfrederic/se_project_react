import tshirtImg from "../assets/t_shirt.png";
import shortImg from "../assets/short.png";
import capImg from "../assets/cap.png";
import sneakersImg from "../assets/sneakers.png";
import coatImg from "../assets/coat.png";
import jacketImg from "../assets/jacket.png";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wearapp.jumpingcrab.com"
    : "http://localhost:3001";

export const defaultClothingItems = [
  {
    _id: 0,
    name: "T-shirt",
    weather: "warm",
    link: tshirtImg,
  },
  {
    _id: 1,
    name: "Short",
    weather: "hot",
    link: shortImg,
  },
  {
    _id: 2,
    name: "Cap",
    weather: "hot",
    link: capImg,
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: sneakersImg,
  },
  {
    _id: 4,
    name: "Coat",
    weather: "cold",
    link: coatImg,
  },
  {
    _id: 5,
    name: "Jacket",
    weather: "warm",
    link: jacketImg,
  },
];

export const coordinates = {
  latitude: 40.7128,
  longitude: -74.006,
};
export const APIkey = "ce4d1a35b75ebe74b8231838818c3c02";
