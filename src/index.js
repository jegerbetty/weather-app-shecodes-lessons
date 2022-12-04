function displaySearchedCityTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let temperatureC = Math.round(response.data.main.temp);
  let temperatureF = Math.round(response.data.main.temp * 1.8 + 32);
  currentTemp.innerHTML = `${temperatureC}°C`;
  console.log(temperatureC);
  console.log(temperatureF);
  console.log(currentTemp);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  //let rainElement = document.querySelector("#rain");
  //rainElement.innerHTML = Math.round(response.data.rain.1h);

  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", displayCelsius);
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", displayFahrenheit);
  function displayCelsius(event) {
    event.preventDefault();
    let temperatureDisplayed = document.querySelector("#current-temp");
    temperatureDisplayed.innerHTML = `${temperatureC}°C`;
  }
  function displayFahrenheit(event) {
    event.preventDefault();
    let temperatureDisplay = document.querySelector("#current-temp");
    temperatureDisplay.innerHTML = `${temperatureF}°F`;
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
  function showCurrentLocationTemp(response) {
    console.log(response);
    let currentLocationTemp = Math.round(response.data.main.temp);
    let currentLocationCity = response.data.name;
    console.log(currentLocationTemp);
    console.log(currentLocationCity);
    let temperatureDisplayed = document.querySelector("#current-temp");
    temperatureDisplayed.innerHTML = `${currentLocationTemp}°C`;
    let currentCityDisplayed = document.querySelector("#current-city");
    currentCityDisplayed.innerHTML = `${currentLocationCity}`;

    let celsius = document.querySelector("#celsius");
    celsius.addEventListener("click", displayCelsius);
    let fahrenheit = document.querySelector("#fahrenheit");
    fahrenheit.addEventListener("click", displayFahrenheit);

    let temperatureC = currentLocationTemp;
    let temperatureF = Math.round(currentLocationTemp * 1.8 + 32);

    function displayCelsius(event) {
      event.preventDefault();
      let temperatureDisplayed = document.querySelector("#current-temp");
      temperatureDisplayed.innerHTML = `${temperatureC}°C`;
    }
    function displayFahrenheit(event) {
      event.preventDefault();
      let temperatureDisplay = document.querySelector("#current-temp");
      temperatureDisplay.innerHTML = `${temperatureF}°F`;
    }
  }

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "63214c4281922e3bb72fdf12dada7734";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showCurrentLocationTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let search = document.querySelector("#city-search-bar");
search.addEventListener("submit", searchCity);

let currentLocationSearch = document.querySelector("#my-location-btn");
currentLocationSearch.addEventListener("click", searchCurrentLocation);

let now = new Date();
console.log(now);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

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
let fullYear = now.getFullYear();
let formattedDate = `${day} ${date}/${month}/${fullYear}`;

let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${hours}:${minutes}`;

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${formattedDate}`;
console.log(formattedDate);

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
