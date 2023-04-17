let lat, lon;
const container = document.querySelector(".container");
const search = document.querySelector(".search-box .fa-magnifying-glass");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const myLocation = document.querySelector(".search-box .fa-location-dot");


myLocation.addEventListener("click",() => {

document.querySelector('.search-box input').value = "";
const success = (position) => {
    console.log(position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    tempo();
}
const error = () => {
    console.log("erro");
}

    navigator.geolocation.getCurrentPosition(success, error);
});

document.querySelector(".search-box .fa-magnifying-glass").style.display = 'none';
function conteudo(){
  if(document.getElementById("texto").value!==""){
    document.querySelector(".search-box .fa-magnifying-glass").style.display = '';
  }else
  document.querySelector(".search-box .fa-magnifying-glass").style.display = 'none';
}

function tempo(){
  const APIKey = "7a4e4e3cd12c50b83be7dbf3f0e3b314";
  const city = document.querySelector('.search-box input').value;

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APIKey}`

  if (city != '')
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`

    fetch(url)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Haze":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "";
      }
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>ºC</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
};


// const latitude = -23.5505;
// const longitude = -46.6333;

// getCityFromLatLng();
// function getCityFromLatLng(latitude, longitude, callback) {
//   const url = `https://nominatim.openstreetmap.org/reve se?format=jsonv2&lat=${latitude}&lon=${longitude}`;

//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then((data) => {
//       const city = data.address.city || data.address.town || data.address.village;
//       callback(null, city);
//     })
//     .catch((error) => {
//       callback(error);
//     });
// }

// getCityFromLatLng(latitude, longitude, (error, city) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Cidade:', city);
//   }
// });
