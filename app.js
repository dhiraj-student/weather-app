const apiKey = '3d2772c69c9edfc3472952ead5320404';

async function getWeather() {
  const city = document.getElementById('city').value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (response.status === 404) {
      alert('City not found!');
      return;
    }

    const data = await response.json();

    document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;

    const weatherCondition = data.weather[0].main;
    console.log("Weather Condition:", weatherCondition);

    const backgrounds = {
      clear: 'url("images/clear.jpeg")',
      rain: 'url("images/rain.jpeg")',
      clouds: 'url("images/clouds.jpeg")',
      snow: 'url("images/snow.jpeg")',
      drizzle: 'url("images/rain.jpeg")',
      thunderstorm: 'url("images/thunderstorm.jpeg")',
      mist: 'url("images/mist.jpeg")',
    };

    const bgImage = backgrounds[weatherCondition] || 'url("images/default.jpeg")';
    console.log("Background Image URL:", bgImage);

    document.body.style.backgroundImage = bgImage;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('There was an error fetching the weather data.');
  }
}

// Optional test line to check if background images load - uncomment to test:
// document.body.style.backgroundImage = 'url("images/clear.jpeg")';
