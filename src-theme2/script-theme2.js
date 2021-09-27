function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response) {
  let forcast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forcastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forcastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forcastDay.temp.max
          )}°</span>
          <span class="weather-forecast-temperature-min">${Math.round(
            forcastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1aab03fdfe08555bc0eb81dd700e783e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");

  celsiusTemperature = response.data.main.temp;

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "1aab03fdfe08555bc0eb81dd700e783e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-form");
  search(cityInputElement.value);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

function showLocation(event) {
  let latitude = event.coords.latitude;
  let longitude = event.coords.longitude;
  console.log(latitude);
  let apiKey = "1aab03fdfe08555bc0eb81dd700e783e";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function getLocalForecast() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocation = document.querySelector("#current-input");
currentLocation.addEventListener("click", getLocalForecast);

let celsiusLink = document.querySelector("#celsius-unit");
celsiusLink.addEventListener("click", showCelsiusTemperature);

function displayDailyPrayer(name) {
  var newLine = "\r\n";
  var msg =
    "أَصْبَـحْـنا وَأَصْبَـحْ المُـلكُ للَّهِ رَبِّ العـالَمـين ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ خَـيْرَ هـذا الـيَوْم ، فَـتْحَهُ ، وَنَصْـرَهُ ، وَنـورَهُ وَبَـرَكَتَـهُ ، وَهُـداهُ ، وَأَعـوذُ بِـكَ مِـنْ شَـرِّ ما فـيهِ وَشَـرِّ ما بَعْـدَه";
  msg += newLine;
  msg +=
    "The morning/night has come to me and the whole universe belongs to Allah, the Lord of the worlds, O Allah, I ask of you the good of the day, it's success and aid and it's nur (celestial light) and barakaat (blessings) and seek hidayah (guidance) and seek refuge from the evil in it (this day) and from the evil of that which is to come later";
  msg += newLine;
  msg += newLine;
  msg +=
    "اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا ، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ المَصِيْر";
  msg += newLine;
  msg +=
    "O Allah we enter the day time and the evening and die with your Qudrat (power) and to You do we return.";
  msg += newLine;
  msg += newLine;
  msg +=
    "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ";
  msg += newLine;
  msg +=
    "We have made (started) the morning (and night) in whose Name nothing in the skies and the earth can harm and He is the All-hearing, the All-knowing.";
  msg += newLine;
  msg += newLine;
  msg +=
    "اللَّهُمَّ مَا أَصْبَحَ بِي مِنْ نِعْمَةٍ أَوْ بِأَحَدٍ مِنْ خَلْقِكَ فَمِنْكَ وَحْدَكَ لَا شَرِيكَ لَكَ فَلَكَ الْحَمْدُ وَلَكَ الشُّكْرُ";
  msg += newLine;
  msg +=
    "O Allah, whatever favours You have bestowed upon me and all other creations is only from you. You are One, You have no partners. Praise and thanks be to You.";

  alert(msg);
}

let displayButtonPrayer = document.querySelector("#prayer-button");
displayButtonPrayer.addEventListener("click", displayDailyPrayer);

search("Berlin");
