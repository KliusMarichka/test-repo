let now = new Date();

let days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ];
  let date = now.getDate();
  let year = now.getFullYear();

  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  let month = months[now.getMonth()];

  let todaysDate = document.querySelector("#today-date");

todaysDate.innerHTML = `${day} ${date}th ${month} ${year}`;

  let hours = now.getHours();
  let minutes = now.getUTCMinutes();

  let time = document.querySelector("#time");

time.innerHTML = `${hours}:${minutes}`;

  
  let button = document.querySelector("#submit-button"); 

  let searchInput = document.querySelector("#search-input");
  let searchCity = document.querySelector("#search-city");


  button.addEventListener("click", function(){
    searchCity.innerHTML = `${searchInput.value}`;
    console.log(searchCity);
  });
 
function handleClick () {

  let apiKey = "df213066af021c82b04122fe0faf0dfc";
  let axiosUrlByCityName = "http://api.openweathermap.org/geo/1.0/direct?q="+searchCity.innerHTML+"&limit=1&appid=df213066af021c82b04122fe0faf0dfc&units=metric";   

  function getTemperature(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#today-temp");
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    temperatureElement.innerHTML = `${temperature}`;
  }

  function getCityCoordinates(response) {
    //console.log(response);
    let latitude = response.data[0].lat;
    let longitude = response.data[0].lon;
  
    let apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&limit=5&appid=df213066af021c82b04122fe0faf0dfc&units=metric";
  
    axios.get(`${apiUrl}&appid=${apiKey}`).then(getTemperature);

  }

  axios.get(`${axiosUrlByCityName}&appid=${apiKey}`).then(getCityCoordinates);

}

button.addEventListener("click", handleClick);

/**
 * Geolocation block
 */

function getPosition() {
  navigator.geolocation.getCurrentPosition(showCoords);
}

function showCoords(position) {

  let latCoord = position.coords.latitude;
  console.log(latCoord);
  let lonCoord = position.coords.longitude;
 
  let coordinates = document.querySelector("#current-position-txt");
  coordinates.innerHTML = `latitude ${latCoord} and longitude ${lonCoord}`;
}

let currentButton = document.querySelector("#current-location-button");

currentButton.addEventListener("click", getPosition);
