// created variables to store refrences to the form elements 
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#city");
var temperatureEl = document.querySelector("#temp");
var windspeedEl = document.querySelector("#windspeed");
var humidityEl = document.querySelector("#humidity");
var currentUVIEl = document.querySelector("#uvindex");
var currentCityEl = document.querySelector("#cityName");
var firstCardForecastDateEl = document.querySelector("#date");
var secondCardForecastDateEl = document.querySelector("#date2");
var thirdCardForecastDateEl = document.querySelector("#date3");
var fourthCardForecastDateEl = document.querySelector("#date4");
var fifthCardForecastDateEl = document.querySelector("#date5");
var austinEL = document.querySelector("#austin"); 
var chicagoEL = document.querySelector("#chicago"); 
var newYorkEL = document.querySelector("#newyork"); 
var orlandoEl = document.querySelector("#orlando");
var sanfranEL = document.querySelector("#sanfran"); 
var seattleEL = document.querySelector("#seattle"); 
var denverEL = document.querySelector("#denver"); 
var atlantaEL = document.querySelector("#atlanta"); 





var tempC1 = document.querySelector("#tempC1");
var tempC2 = document.querySelector("#tempC2");
var tempC3 = document.querySelector("#tempC3");
var tempC4 = document.querySelector("#tempC4");
var tempC5 = document.querySelector("#tempC5");

var tempC1 = document.querySelector("#tempC1");
var tempC2 = document.querySelector("#tempC2");
var tempC3 = document.querySelector("#tempC3");
var tempC4 = document.querySelector("#tempC4");
var tempC5 = document.querySelector("#tempC5");

 var humidityC1 = document.querySelector("#humidityC1"); 
 var humidityC2 = document.querySelector("#humidityC2"); 
 var humidityC3 = document.querySelector("#humidityC3"); 
 var humidityC4 = document.querySelector("#humidityC4"); 
 var humidityC5 = document.querySelector("#humidityC5"); 




//checking to see if the user has hit the form submission button 
var formSubmitHandler = function (event) {
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
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeatherInfo(data, city);
                });
            } else {
                // not a real city 
                alert("Error: City " + response.statusText);
            }
        })
        .catch(function (error) {
            // api is down error 
            alert("Unable to get weather data");
        });
};

var displayUvIndex = function (weatherData) {

    //storing current Cityies UV Index and using the lat and lon to get the index 
    var currentLatitude = weatherData.coord.lat;
    var currentLongitude = weatherData.coord.lon;

    var uvApiUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + currentLatitude + "&lon=" + currentLongitude + "&appid=2b92c62c9685a63968aa0914485ee11e";
    console.log(uvApiUrl);

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

    var day = moment().format("MM/DD/YYYY");
    $("#currentDay").text("(" + day + ")");

    //display the name of the city and the current date
    currentCity = weatherData.name + " " + "(" + day + ")";
    currentCityEl.textContent = currentCity;

    var currentTemp = Math.round((weatherData.main.temp - 273.15) * 1.8 + 32);
    // formula found - https://www.inchcalculator.com/convert/meter-per-second-to-mile-per-hour/
    var currentWindSpeed = Math.round(2.236936 * weatherData.wind.speed);
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

    //display the citys five day forecast 
    getCitiesFiveDayForecast(weatherData);

}

var getCitiesFiveDayForecast = function (weatherData) {

    cityName = weatherData.name;
    console.log(cityName);
    var uvApiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=eb949b812d5b317171e6e26d09efec47";

    fetch(uvApiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecastData) {



            console.log(forecastData);

            //get date for each card - definitely need to refactor this.  Thinking for loop 

            var currentDate1 = moment(forecastData.list[1].dt_txt).format("MM/DD/YYYY");
            var currentDate2 = moment(forecastData.list[9].dt_txt).format("MM/DD/YYYY");
            var currentDate3 = moment(forecastData.list[17].dt_txt).format("MM/DD/YYYY");
            var currentDate4 = moment(forecastData.list[25].dt_txt).format("MM/DD/YYYY");
            var currentDate5 = moment(forecastData.list[33].dt_txt).format("MM/DD/YYYY");

            //getting temp for each card - needs a refactor 

            var cityTemp1 = Math.floor((forecastData.list[1].main.temp - 273.15) * 1.8 + 32);
            var cityTemp2 = Math.floor((forecastData.list[9].main.temp - 273.15) * 1.8 + 32);
            var cityTemp3 = Math.floor((forecastData.list[17].main.temp - 273.15) * 1.8 + 32);
            var cityTemp4 = Math.floor((forecastData.list[25].main.temp - 273.15) * 1.8 + 32);
            var cityTemp5 = Math.floor((forecastData.list[33].main.temp - 273.15) * 1.8 + 32);

            //getiting humidity for each card 
            var humidity1 = forecastData.list[2].main.humidity;
            var humidity2 = forecastData.list[9].main.humidity;
            var humidity3 = forecastData.list[17].main.humidity;
            var humidity4 = forecastData.list[25].main.humidity;
            var humidity5 = forecastData.list[33].main.humidity;



            //printing date on each card 
            firstCardForecastDateEl.textContent = currentDate1;
            secondCardForecastDateEl.textContent = currentDate2;
            thirdCardForecastDateEl.textContent = currentDate3;
            fourthCardForecastDateEl.textContent = currentDate4;
            fifthCardForecastDateEl.textContent = currentDate5;

            //displaying temp on card
            tempC1.textContent = cityTemp1; 
            tempC2.textContent = cityTemp2; 
            tempC3.textContent = cityTemp3; 
            tempC4.textContent = cityTemp4; 
            tempC5.textContent = cityTemp5; 

            //displaying humidity on card 
            humidityC1.textContent = humidity1; 
            humidityC2.textContent = humidity2; 
            humidityC3.textContent = humidity3; 
            humidityC4.textContent = humidity4; 
            humidityC5.textContent = humidity5; 


        });


}


document.getElementById("austin").addEventListener("click", function(){

    event.preventDefault();
    // get value from input element
    var cityName = "austin"; 

    if (cityName) {
        getWeatherData(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);


});

document.getElementById("chicago").addEventListener("click", function(){

    event.preventDefault();
    // get value from input element
    var cityName = "chicago"; 

    if (cityName) {
        getWeatherData(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);


});

document.getElementById("newyork").addEventListener("click", function(){

    event.preventDefault();
    // get value from input element
    var cityName = "New York"; 

    if (cityName) {
        getWeatherData(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);


});

document.getElementById("orlando").addEventListener("click", function(){

    event.preventDefault();
    // get value from input element
    var cityName = "orlando"; 

    if (cityName) {
        getWeatherData(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);


});

document.getElementById("sanfran").addEventListener("click", function(){

    event.preventDefault();
    // get value from input element
    var cityName = "San Francisco"; 

    if (cityName) {
        getWeatherData(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);


});

document.getElementById("seattle").addEventListener("click", function(){

    event.preventDefault();
    // get value from input element
    var cityName = "seattle"; 

    if (cityName) {
        getWeatherData(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);


});

document.getElementById("denver").addEventListener("click", function(){

    event.preventDefault();
    // get value from input element
    var cityName = "denver"; 

    if (cityName) {
        getWeatherData(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);


});

document.getElementById("atlanta").addEventListener("click", function(){

    event.preventDefault();
    // get value from input element
    var cityName = "atlanta"; 

    if (cityName) {
        getWeatherData(cityName);
        nameInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
    console.log(event);


});