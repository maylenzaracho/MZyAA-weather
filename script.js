// Clave de la API de OpenWeatherMap
const apiKey = '290a409177b4b732c9da06295ab96433';

// Elementos del DOM
const cityInput = document.getElementById("city");
const tempElement = document.getElementById("temp");
const description = document.getElementById("description");
const cityTitle = document.getElementById("city-title");
const humidityValue = document.getElementById("humidity-value");
const windValue = document.getElementById("wind-value");

// Vacia el campo de entrada al cargar la página
cityInput.value = '';

// Función para actualizar los datos del clima
function updateWeatherData(data) {
  // Actualiza los elementos del DOM con los datos del clima
  tempElement.textContent = `${data.main.temp}° C`;
  description.textContent = data.weather[0].description;
  cityTitle.textContent = `Clima en ${data.name}`;
  humidityValue.textContent = `${data.main.humidity}%`;
  windValue.textContent = `${data.wind.speed} km/h`;

  // Establece el fondo de pantalla según la ciudad
  document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + data.name + " city')";
}

// Función para obtener datos del clima mediante la API
function fetchWeatherData(ciudad) {
  // URL API
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&units=metric&appid=${apiKey}`;

  // Realiza una solicitud fetch para obtener datos del clima
  fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      updateWeatherData(data);
    })
    .catch((error) => {
      console.error('Hubo un error en la operación', error);
    });
}

// Ciudad predeterminada para cargar al cargar la página
const defaultCity = 'Encarnación';
fetchWeatherData(defaultCity);

// Agrega un evento al botón para obtener datos del clima cuando se hace clic
document.querySelector('button').addEventListener('click', function () {
  const ciudad = cityInput.value.trim();
  if (ciudad) {
    fetchWeatherData(ciudad);
  } else {
    alert('Por favor, ingresa un nombre de ciudad.');
  }
});

// Agrega un evento al campo de entrada para obtener datos del clima al presionar Enter
cityInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    const ciudad = cityInput.value.trim();
    if (ciudad) {
      fetchWeatherData(ciudad);
    } else {
      alert('Por favor, ingresa un nombre de ciudad.');
    }
  }
});
