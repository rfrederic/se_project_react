import "./WeatherCard.css";
import rectangle from "../../assets/rectangle.svg";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnit";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature =
    currentTemperatureUnit === "F"
      ? weatherData.temp.F
      : Math.round(((weatherData.temp.F - 32) * 5) / 9);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {temperature}&deg;{currentTemperatureUnit}
      </p>
      <img src={rectangle} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
