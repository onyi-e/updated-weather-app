let temp = null;

function userCityWeatherUpdate(response) {
  let tempElement = document.querySelector("#temp");
  temp = response.data.temperature.current;
  let cityElement = document.querySelector("#user-city");
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temp);
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
