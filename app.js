const apiKey = "3bd69d03a96545413a39a4e8a5b09442"; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name");
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

function fetchWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weatherCard = document.getElementById("weatherResult");
      weatherCard.style.display = "block";
      weatherCard.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
        <p>🌡 Temp: ${data.main.temp}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" />
      `;
    })
    .catch((error) => {
      alert(
        "Unable to fetch weather data. Please check the city name or try again."
      );
      console.error(error);
    });
}
