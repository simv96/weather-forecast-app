function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}
let currentDateELement = document.querySelector("#date-time");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  let cityHeading = document.querySelector("#city-header");
  cityHeading.innerHTML = `${city.value}`;

  function showCurrentWeather(response) {
    let temp = Math.round(response.data.temperature.current);
    let tempHeader = document.querySelector("#current-temp-value");
    tempHeader.innerHTML = `${temp}`;
  }
  let cityValue = city.value;
  let apiKey = "ee21f04bf3f2ad6e420ef9to7c4ad1a4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let cityInput = document.querySelector("#search-bar");
cityInput.addEventListener("submit", searchCity);
