var express = require('express');
var router = express.Router();
var request = require("request");
var bodyparser = require("body-parser");
const { response } = require('../app');
const apiKey = "9b3329a2c205b01691858c30a50088c9";


router.get("/", function(req, res){
  res.render("index", {weather: null, error: null})
})

router.post("/city", function(req, res){
  let city = req.body.city;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  request({url: url, jason: true}, function(err, response, body){
    if(err){
      res.send('Error please try again')
    }
    else{
      var weather = JSON.parse(body);
      if(weather.main == undefined){
        res.send("Unable to find the Location ")
      }
      else{
        var place = `${weather.name}, ${weather.sys.country}`
        weatherTimezone = `${new Date().toDateString()}`;
        var weatherTemp = (weather.main.temp - 273.15).toFixed(0);
        weatherDescription = `${weather.weather[0].description}`
        humidity = `${weather.main.humidity}`
        clouds = `${weather.clouds.all}`
        speed = `${weather.wind.speed}`
        visibility = `${weather.visibility}`
        main = `${weather.weather[0].main}`
        weatherFahrenheit = (weatherTemp  * 9) / 5 + 32;
        
        function roundToTwo(num) {
          return +(Math.round(num + "e+2") + "e-2");
        }
        weatherFahrenheit = roundToTwo(weatherFahrenheit);
        console.log(weatherFahrenheit)
      }
      console.log("first else block weather.name value",weather.name)
    }
    res.render("index", {
      weather: weather,
      place:place,
      timezone: weatherTimezone, 
      temp: weatherTemp,
      fahrenheit: weatherFahrenheit,
      weatherDescription,
      Mainweather : main,
      humidity: humidity,
      clouds: clouds,
      speed: speed,
      visibility
    })
   
  })
})


module.exports = router;
