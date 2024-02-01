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

function showCurrentWeather(response) {
  let temp = Math.round(response.data.temperature.current);
  let tempHeader = document.querySelector("#current-temp-value");
  let city = response.data.city;
  let cityHeading = document.querySelector("#city-header");
  let condition = response.data.condition.description;
  let conditionHeader = document.querySelector("#condition");
  let humidity = response.data.temperature.humidity;
  let humidityHeader = document.querySelector("#humidity");
  let wind = response.data.wind.speed;
  let windHeader = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  tempHeader.innerHTML = `${temp}`;
  cityHeading.innerHTML = `${city}`;
  conditionHeader.innerHTML = `${condition}`;
  humidityHeader.innerHTML = `${humidity}%`;
  windHeader.innerHTML = `${wind}km/h`;
  icon.innerHTML = `<img
              src="${response.data.condition.icon_url}"
              alt=""
              class="temp-icon"
            />`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityValue = cityInput.value;
  let apiKey = "ee21f04bf3f2ad6e420ef9to7c4ad1a4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", searchCity);
