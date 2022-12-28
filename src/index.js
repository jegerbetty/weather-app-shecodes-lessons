function lastUpdatedFormat(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];

  let dayDate = date.getDate();
  if (dayDate < 10) {
    dayDate = `0${dayDate}`;
  }

  let month = months[date.getMonth()];

  let fullYear = date.getFullYear();

  return `${day} ${dayDate}/${month}/${fullYear} ${hours}:${minutes}`;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function getForecastFahrenheit(coordinates) {
  console.log(coordinates);
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=imperial`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function displaySearchedCityTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let temperatureC = Math.round(response.data.main.temp);
  let temperatureF = Math.round(response.data.main.temp * 1.8 + 32);
  currentTemp.innerHTML = `${temperatureC}`;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;

  let rainElement = document.querySelector("#rain");
  if (response.data.rain && response.data.rain["1h"]) {
    let precipitation = response.data.rain["1h"];
    if (precipitation !== undefined) {
      rainElement.innerHTML = `${precipitation}mm`;
    } else {
      rainElement.innerHTML = `0mm`;
    }
  } else {
    rainElement.innerHTML = `0mm`;
  }

  let snowElement = document.querySelector("#rain");
  if (response.data.snow && response.data.snow["1h"]) {
    let precipitation = response.data.snow["1h"];
    if (precipitation !== undefined) {
      snowElement.innerHTML = `${precipitation}mm`;
    } else {
      snowElement.innerHTML = `0mm`;
    }
  } else {
    snowElement.innerHTML = `0mm`;
  }

  let lastupdatedElement = document.querySelector("#last-updated-time");
  lastupdatedElement.innerHTML = lastUpdatedFormat(response.data.dt * 1000);

  getForecast(response.data.coord);

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", displayCelsius);
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", displayFahrenheit);
  function displayCelsius(event) {
    event.preventDefault();
    let temperatureDisplayed = document.querySelector("#current-temp");
    temperatureDisplayed.innerHTML = `${temperatureC}`;
    let celsius = document.querySelector("#celsius");
    celsius.classList.add("active");
    celsius.classList.remove("link-success");
    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.classList.remove("active");
    fahrenheit.classList.add("link-success");
    getForecast(response.data.coord);
  }
  function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureDisplay = document.querySelector("#current-temp");
    temperatureDisplay.innerHTML = `${temperatureF}`;
    let celsius = document.querySelector("#celsius");
    celsius.classList.remove("active");
    celsius.classList.add("link-success");
    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.classList.add("active");
    fahrenheit.classList.remove("link-success");
    getForecastFahrenheit(response.data.coord);
  }
}

function searchCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-input");
  let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedCityTemp);
}

function searchCurrentLocation() {
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "63214c4281922e3bb72fdf12dada7734";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displaySearchedCityTemp);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

function searchLondon() {
  let londonUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=${apiKey}`;
  axios.get(londonUrl).then(displaySearchedCityTemp);
}

function searchTokyo() {
  let tokyoUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&units=metric&appid=${apiKey}`;
  axios.get(tokyoUrl).then(displaySearchedCityTemp);
}

function searchNewYork() {
  let newyorkUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${apiKey}`;
  axios.get(newyorkUrl).then(displaySearchedCityTemp);
}

function searchBuenosAires() {
  let buenosairesUrl = `https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&units=metric&appid=${apiKey}`;
  axios.get(buenosairesUrl).then(displaySearchedCityTemp);
}

function searchJohannesburg() {
  let johannesburgUrl = `https://api.openweathermap.org/data/2.5/weather?q=Johannesburg&units=metric&appid=${apiKey}`;
  axios.get(johannesburgUrl).then(displaySearchedCityTemp);
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return forecastDays[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<li class="list-group-item">
    <span class="weather-forecast-day">${formatForecastDate(
      forecastDay.dt
    )}: </span>
                  <span class="weather-forecast-icon"><img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" width="30"/></span>
                  <span class="weather-forecast-description"> ${
                    forecastDay.weather[0].description
                  } </span>
                  <br />
                  <span class="weather-forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span>/</span>
                  <span class="weather-forecast-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                  <span class="weather-forecast-rain" id="rain-forecast">${Math.round(
                    forecastDay.rain
                  )}mm</span>
                  </li>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function currentTime() {
  let now = new Date();

  let day = days[now.getDay()];

  let month = months[now.getMonth()];

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }

  let fullYear = now.getFullYear();
  let formattedDate = `${day} ${date}/${month}/${fullYear}`;

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${formattedDate}`;

  let currentTime = document.querySelector("#time");
  currentTime.innerHTML = `${hours}:${minutes}`;
}

let search = document.querySelector("#city-search-bar");
search.addEventListener("submit", searchCity);

let currentLocationSearch = document.querySelector("#my-location-btn");
currentLocationSearch.addEventListener("click", searchCurrentLocation);

let londonClick = document.querySelector("#London");
londonClick.addEventListener("click", searchLondon);

let tokyoClick = document.querySelector("#Tokyo");
tokyoClick.addEventListener("click", searchTokyo);

let newYorkClick = document.querySelector("#New-York");
newYorkClick.addEventListener("click", searchNewYork);

let buenosAiresClick = document.querySelector("#Buenos-Aires");
buenosAiresClick.addEventListener("click", searchBuenosAires);

let johannesburgClick = document.querySelector("#Johannesburg");
johannesburgClick.addEventListener("click", searchJohannesburg);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let monthsName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

currentTime();

let apiKey = "63214c4281922e3bb72fdf12dada7734";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&units=metric&appid=${apiKey}`;
axios.get(apiUrl).then(displaySearchedCityTemp);
