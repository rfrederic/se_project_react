import "./WeatherCard.css";
import rectangle from "../../assets/rectangle.svg";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg;</p>
      <img src={rectangle} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
