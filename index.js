let temp = null;

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
function convertTemp(temp) {
  let convertedElement = document.querySelector("#temp");
  let convertTemperature = (temp * 9) / 5 + 32;
  convertTemperature = Math.round(convertTemperature);
  convertedElement.innerHTML = convertTemperature;
  let celciusElement = document.querySelector("#celcius");
  celciusElement.innerHTML = "℉";
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

let userCity = document.querySelector("#form-input");
userCity.addEventListener("submit", userInputCity);
updateWeatherReading("Lagos");

let celciusElement = document.querySelector("#celcius");
celciusElement.addEventListener("click", function () {
  if (temp !== null) {
    convertTemp(temp);
  }
});
