const apiKey = "e093eaa1c48cc05fea80410cb654cff5";
let latitude;
let longitude;

let weather = {};
weather.temperature = {
  unit: "celcius",
};

getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    const notice = document.getElementsByClassName("notification")[0];
    notice.style.display = "block";
    notice.innerHTML = "Your browser does not support geolocation!";
  }
}

function kelvinToCelsius(temperature) {
  return temperature - 273.15;
}

function onSuccess(position) {
  //console.log(position);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  const weatherCall = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );
  console.log(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  );

  weatherCall
    .then((response) => response.json())
    .then((weatherInfo) => {
      weather.temperature.value = Math.floor(
        kelvinToCelsius(weatherInfo.main.temp)
      );
      weather.iconId = weatherInfo.weather[0].icon;
      weather.description = weatherInfo.weather[0].description;
      weather.city = weatherInfo.name;
      weather.country = weatherInfo.sys.country;
      // console.log(weatherInfo.weather[0].icon);
      // console.log(kelvinToCelsius(weatherInfo.main.temp).toFixed(1));
      // console.log(weatherInfo.weather[0].main);
      // console.log(weatherInfo.name);
    })
    .then(function () {
      displayWeather();
    });
}
function displayWeather() {
  let temperatures = document.querySelector(".temperature-value p");
  let icons = document.querySelector(".weather-icon");
  let descript = document.querySelector(".temperature-description p");
  let locate = document.querySelector(".location");

  temperatures.innerHTML = `${weather.temperature.value}º<span>C<span>`;
  icons.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  descript.innerHTML = weather.description;
  locate.innerHTML = `${weather.city}, ${weather.country}`;
}

function onError(error) {
  console.error("No no no ", error);
  º;
  // 1. take message and put it in a p
  const p = document.createElement("p");
  p.innerHTML = error.message;
  // 2. display: block (notification div)
  notification.style.display = "block";
  // 3. append p inside notification
  notification.appendChild(p);
}
