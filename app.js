const apiKey = '3d2772c69c9edfc3472952ead5320404';

// Function to smoothly change background image
function changeBackgroundImage(imageFile) {
  const body = document.body;

  // Fade out
  body.classList.add("fade-out");

  // Preload the new image before fading in
  const img = new Image();
  img.src = `images/${imageFile}`;
  img.onload = () => {
    setTimeout(() => {
      body.style.backgroundImage = `url('images/${imageFile}')`;
      body.classList.remove("fade-out"); // fade in
    }, 500); // matches the CSS transition duration
  };
}

// Function to determine background image from weather condition
function setBackgroundImage(condition) {
  const weather = condition.toLowerCase();

  const backgrounds = {
    clear: 'clear.jpg',
    rain: 'rain.jpg',
    clouds: 'clouds.jpg',
    snow: 'snow.jpg',
    drizzle: 'rain.jpg',
    thunderstorm: 'thunderstorm.jpg',
    mist: 'mist.jpg'
  };

  let matchedImage = 'default.jpg';
  for (let key in backgrounds) {
    if (weather.includes(key)) {
      matchedImage = backgrounds[key];
      break;
    }
  }

  changeBackgroundImage(matchedImage);
}

// Set default background when page loads
setBackgroundImage('default');

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

    const weatherCondition = data.weather[0].main || "";
    console.log("Weather Condition from API:", weatherCondition);

    setBackgroundImage(weatherCondition);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    alert('There was an error fetching the weather data.');
  }
}
