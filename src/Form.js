import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  const [place, setPlace] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [busy, setBusy] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (place && !busy) {
      setBusy(true);
      setResultMessage("");

      let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
      let units = "metric";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}&units=${units}`;

      axios.get(apiUrl).then((result) => {
        // Update the search message with the place entered by the user
        console.log(result);
        // Extract necessary data
        let weather = result.data.weather[0];
        let city = result.data.name;
        let temperature = Math.round(result.data.main.temp);
        let description = weather.description;
        let humidity = result.data.main.humidity;
        let windSpeed = result.data.wind.speed;
        let iconSrc = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

        setResultMessage(
          <ul>
            <li className="weatherAppDetails1">
              <div className="City">{city}</div>
              <div className="tempDigit">{temperature}°C <img className="tempDigit"alt={description} src={iconSrc} /></div>
             
             
            </li>
            <li className="weatherAppDetails2">Sky: {description}</li>
            <li className="weatherAppDetails2">Humidity: {humidity}%</li>
            <li className="weatherAppDetails2">Wind: {windSpeed}km/h</li>
            
          </ul>
        );
        // Optionally reset the place input
        setPlace("");

        setBusy(false);
      });
    }
  }

  function updatePlace(event) {
    setPlace(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="searchForm"
          placeholder="Enter a city.."
          type="search"
          value={place}
          onChange={updatePlace}
        />
        <input
          className="searchFormButton"
          type="submit"
          value="Search"
          disabled={busy}
        />
      </form>
      {/* Conditionally render the search message if it exists */}
      {resultMessage && <p>{resultMessage}</p>}
    </div>
  );
}
