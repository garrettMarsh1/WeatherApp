/* This function sets up the use of the openweathermap api which provides
the weather data for the application*/

let weather = {
    apiKey: "884429938c4e95cca92dcc3032645b85",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=imperial&appid=" 
             + this.apiKey   
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    /*this function takes data in from the api, formats, and sends data
    according to the location of the users search */

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp.toFixed(0) + "°F";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".wind").innerText = speed.toFixed(0) + " MPH";
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080?" + name + "')";
        
            
    },

/*this function enables use of the search bar */
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};    
/*this function enables use of the search button*/
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });

/*this function enables use of the enter key when searching */
  document.querySelector(".search-bar").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search()
      }
});

/* intitial location for the application */
weather.fetchWeather("New York");