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

function displaySearchedCityTemp(response) {
  console.log(response);
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

  //let rainElement = document.querySelector("#rain");
  //let precipitation = Math.round(response.data.rain["1h"]);
  //rainElement.innerHTML = `${precipitation}`;
  //if (precipitation !== undefined) {
  //  precipitation = `${Math.round(response.data.rain["1h"])}mm`;
  //} else {
  //  precipitation = `0mm`;
  //}

  let lastupdatedElement = document.querySelector("#last-updated-time");
  lastupdatedElement.innerHTML = lastUpdatedFormat(response.data.dt * 1000);

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
    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.classList.remove("active");
  }
  function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureDisplay = document.querySelector("#current-temp");
    temperatureDisplay.innerHTML = `${temperatureF}`;
    let celsius = document.querySelector("#celsius");
    celsius.classList.remove("active");
    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.classList.add("active");
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
//axios.get(apiUrl).then(searchCity);

//function displayCelsius(event) {
//event.preventDefault();
//let temperatureDisplayed = document.querySelector("#current-temp");
//temperatureDisplayed.innerHTML = `${temperatureC}°C`;
//}
//function displayFahrenheit(event) {
//event.preventDefault();
//let temperatureDisplay = document.querySelector("#current-temp");
//temperatureDisplay.innerHTML = `${temperatureF}°F`;
//}

//let currentTemp = document.querySelector("#current-temp");
//let temperatureC = Math.round(15);
//let temperatureF = Math.round(temperatureC * 1.8 + 32);
//console.log(currentTemp);
//console.log(temperatureC);
//console.log(temperatureF);

//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", displayCelsius);
//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", displayFahrenheit);

//let weather = {
//paris: {
//temp: 19.7,
//humidity: 80,
//},
//tokyo: {
//temp: 17.3,
//humidity: 50,
//},
//lisbon: {
//temp: 30.2,
//humidity: 20,
//},
//"san francisco": {
//temp: 20.9,
//humidity: 100,
//},
//oslo: {
//temp: -5,
//humidity: 20,
//},
//};

// write your code here

//let city = prompt(`Enter a city`);
//city = city.toLowerCase();
//city = city.trim();

//function weatherMessage() {
//let temperatureC = Math.round(weather[city].temp);
//let temperatureF = Math.round(temperatureC * 1.8 + 32);
//let humid = weather[city].humidity;

//alert(
//  `It is currently ${temperatureC}°C (${temperatureF}°F) in ${city} with a humidity of ${humid}%`
//);
//}

//function sorryMessage() {
//alert(
//`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
//);
//}

//if (weather[city] !== undefined) {
//weatherMessage();
//} else {
//sorryMessage();
//}
