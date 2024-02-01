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
  let wind = response.data.wind.speed;
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = "";

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="forecast-date">
          <div class="forecast-day">${day}</div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-night.png"
            alt=""
            width="50"
          />
          <div class="forecast-temps">
            <span class="forecast-high">20°c </span
            ><span class="forecast-low"> 16°c</span>
          </div>
        </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
