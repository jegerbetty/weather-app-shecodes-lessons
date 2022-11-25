let apiKey = "63214c4281922e3bb72fdf12dada7734";

function displaySearchedCityTemp(response) {
  let currentTemp = document.querySelector("#current-temp");
  let temperatureC = Math.round(response.data.main.temp);
  let temperatureF = Math.round(response.data.main.temp * 1.8 + 32);
  currentTemp.innerHTML = `${temperatureC}°C`;
  console.log(temperatureC);
  console.log(temperatureF);
  console.log(currentTemp);

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

function changeCity(response) {
  console.log(response);
  let displayedCity = document.querySelector("#current-city");
  let newDisplayedCity = response.data.name;
  displayedCity.innerHTML = `${newDisplayedCity}`;
  //let apiKey = "63214c4281922e3bb72fdf12dada7734";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newDisplayedCity}&units=metric&appid=${apiKey}`;
}

function showPosition(position) {
  console.log(position);
  let latitude = position.data[0].lat;
  let longitude = position.data[0].lon;
  //let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedCityTemp);
  axios.get(apiUrl).then(changeCity);
}

function searchCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-input");
  //let apiKey = "63214c4281922e3bb72fdf12dada7734";
  let apiGeoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchedCity.value}&limit=5&appid=${apiKey}`;
  axios.get(apiGeoUrl).then(showPosition);
  //axios.get(apiUrl).then(displaySearchedCityTemp);
  //axios.get(apiUrl).then(changeCity);
}

function searchCurrentLocation() {
  function getCoordinates(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    //let apiKey = "63214c4281922e3bb72fdf12dada7734";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displaySearchedCityTemp);
    axios.get(apiUrl).then(changeCity);
  }
  navigator.geolocation.getCurrentPosition(getCoordinates);
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
let currentMonth = months[now.getMonth()];

let minutes = [
  "00",
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
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "20",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
  "51",
  "52",
  "53",
  "54",
  "55",
  "56",
  "57",
  "58",
  "59",
];
let currentMinute = minutes[now.getMinutes()];

let currentDay = now.getDate();
//let currentMonth = now.getMonth();
let currentFullYear = now.getFullYear();
let formattedDate = `${day} ${currentDay}/${currentMonth}/${currentFullYear}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${now.getHours()}:${currentMinute}`;

let currentDate = document.querySelector("#today-date");
currentDate.innerHTML = `${formattedDate}`;
console.log(formattedDate);

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
