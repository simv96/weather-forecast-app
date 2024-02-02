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
  let city = response.data.city;
  let condition = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  let tempHeader = document.querySelector("#current-temp-value");
  let cityHeading = document.querySelector("#city-header");
  let conditionHeader = document.querySelector("#condition");
  let humidityHeader = document.querySelector("#humidity");
  let windHeader = document.querySelector("#wind");

  tempHeader.innerHTML = `${temp}`;
  cityHeading.innerHTML = `${city}`;
  conditionHeader.innerHTML = `${condition}`;
  humidityHeader.innerHTML = `${humidity}%`;
  windHeader.innerHTML = `${wind} km/h`;
  icon.innerHTML = `<img
              src="${response.data.condition.icon_url}"
              alt=""
              class="temp-icon"
            />`;

  getForecast(`${city}`);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let cityValue = cityInput.value;
  let apiKey = "ee21f04bf3f2ad6e420ef9to7c4ad1a4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityValue}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentWeather);
}
let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", searchCity);

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ee21f04bf3f2ad6e420ef9to7c4ad1a4";
  let apiForecastURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiForecastURL).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="forecast-date">
          <div class="forecast-day">${formatForecastDay(day.time)}</div>
          <img
            src="${day.condition.icon_url}"
            alt=""
            width="55"
          />
          <div class="forecast-temps">
            <span class="forecast-high"> ${Math.round(
              day.temperature.maximum
            )}°c</span 
            > <br /><span class="forecast-low"> ${Math.round(
              day.temperature.minimum
            )}°c</span>
          </div>
        </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}
