function userCityWeatherUpdate(response) {
  let tempElement = document.querySelector("#temp");
  temp = response.data.temperature.current;
  let cityElement = document.querySelector("#user-city");
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temp);
  let country = document.querySelector("#country");
  country.innerHTML = response.data.country;
  let date = new Date(response.data.time * 1000);
  let userDate = document.querySelector("#current-date");
  userDate.innerHTML = convertDate(date);

  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}% `;
  let windSpeed = document.querySelector("#wind-speed");
  let windReading = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${windReading}km/hr `;
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  getForecast(response.data.city);
}

function convertDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute},`;
}

function updateWeatherReading(city) {
  let apiKey = "3aco6795a94b0838a7e43f73ad5b4e0t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=3aco6795a94b0838a7e43f73ad5b4e0t&units=metric`;
  axios.get(apiUrl).then(userCityWeatherUpdate);
}

function userInputCity(event) {
  event.preventDefault();
  let userCityinput = document.querySelector("#user-input");
  updateWeatherReading(userCityinput.value);
}

function convertForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=3aco6795a94b0838a7e43f73ad5b4e0t&units=metric`;
  axios(apiUrl).then(updateForecastHtml);
}

function updateForecastHtml(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-day">
  <div class="weather-forecast-day">${convertForecastDate(day.time)}</div>
  
  <img src="${day.condition.icon_url}" class="forecast-icon"/>
  <div class="forecast-temp">
  <strong>${Math.round(day.temperature.maximum)}°</strong>
  <span class="lowest-temp-forecast">${Math.round(
    day.temperature.minimum
  )}°</span>
  </div>
  </div>`;
    }

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
  });
}

let userCity = document.querySelector("#form-input");
userCity.addEventListener("submit", userInputCity);

updateWeatherReading("Lagos");
