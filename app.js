const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const apikey = "7f006167ac3d2923e6ab802cf5943bb0";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey +"&units=" + unit
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description
      const name = weatherData.name
      const icon = weatherData.weather[0].icon
      const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"
      res.write("<div style='font-size:80px;color:blue;text-align:center;'<h1>The temperature in " + name + " is " + temp + " degree celcius.</h1></div>");
      res.write("<div style='font-size:40px;color:blue;text-align:center;'<h3>weather Description is: " + weatherDescription + "</h3></div>");
      res.write("<div><img style='height:100px;weight:100px;margin:0 auto;display:block;'src ="+imageURL+"></div>");
      res.send();
    });
  });

})


app.listen(3000,function(){
  console.log("Server is started at port 3000");
});
