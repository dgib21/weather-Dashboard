

// created variables to store refrences to the form elements 
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var temperatureEl = document.querySelector("#temp");
var windspeedEl = document.querySelector("#windspeed"); 
var humidityEl = document.querySelector("#humidity"); 
var currentUVIEl = document.querySelector("#uvindex");



//checking to see if the user has hit the form submission button 
var formSubmitHandler = function (event) {
    console.log("Button was clicked")
    event.preventDefault();
    // get value from input element
    var cityName = nameInputEl.value.trim();

    if (cityName) {
        getWeatherData(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);
};

var getWeatherData = function (city) {
    //format the github api url
    console.log("Button was clicked"); 
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2b92c62c9685a63968aa0914485ee11e";
    console.log(apiUrl);
    fetch(apiUrl)
    .then(function(response) {
      // request was successful
      if (response.ok) {
        response.json().then(function(data) {
            displayWeatherInfo(data, city); 
        });
      } else {
          // not a real city 
        alert("Error: City " + response.statusText);
      }
    })
    .catch(function(error) {
      // api is down error 
      alert("Unable to get weather data");
    });
};

var displayUvIndex = function (weatherData) {

    //storing current Cityies UV Index and using the lat and lon to get the index 
    var currentLatitude = weatherData.coord.lat; 
    var currentLongitude = weatherData.coord.lon; 

    var uvApiUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + currentLatitude + "&lon=" + currentLongitude + "&appid=2b92c62c9685a63968aa0914485ee11e"; 
    console.log (uvApiUrl); 

    fetch(uvApiUrl)
    .then(function (response) {
        
        return response.json();
      })
      .then(function (response) {
        var currentUvIndex = response.value;
        currentUVIEl.textContent = currentUvIndex;

   //display background color for UVIndex 
   //https://www.epa.gov/sites/production/files/documents/uviguide.pdf
   if (currentUvIndex < 4) {
    currentUVIEl.classList = "favorable";
  } else if (currentUvIndex > 4 && currentUvIndex < 7) {
    currentUVIEl.classList = "moderate";
  } else if (currentUvIndex > 7) {
    currentUVIEl.classList = "severe";
  }


});
};

userFormEl.addEventListener("submit", formSubmitHandler);

var displayWeatherInfo = function (weatherData, searchTerm) {
    console.log(weatherData); 
    console.log(searchTerm); 

    var currentTemp = Math.round((weatherData.main.temp-273.15) * 1.8 + 32);
   // formula found - https://www.inchcalculator.com/convert/meter-per-second-to-mile-per-hour/
    var currentWindSpeed = Math.round(2.236936*weatherData.wind.speed);
    var currentHumidity = weatherData.main.humidity; 
   // var UV Index = 

    
   //displaying current values 
    var cityTemperature = currentTemp; 
    temperatureEl.textContent = cityTemperature; 

    var cityWindSpeed = currentWindSpeed; 
    windspeedEl.textContent = cityWindSpeed; 
    
    var cityHumidity = currentHumidity; 
    humidityEl.textContent = currentHumidity;

    //display that city's uv index
    displayUvIndex(weatherData);
    

}
