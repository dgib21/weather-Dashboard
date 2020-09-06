

// created variables to store refrences to the form elements 
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");


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
            console.log("Button was clicked")
        });
      } else {
        alert("Error: City" + response.statusText);
      }
    })
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to get weather data");
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);
