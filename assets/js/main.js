var x = document.getElementById("test");
var PosCor = [];
var APIkey = "d960df4869f4f5b6c5fc49e3d479cbfe";
getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  console.log(position);
  var latlon = position.coords.latitude + "," + position.coords.longitude;
  PosCor[0] = position.coords.latitude;
  PosCor[1] = position.coords.longitude;
  var img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" + latlon + "&zoom=14&size=400x300&sensor=false";
  document.getElementById("mapholder").innerHTML = "<img src='" + img_url + "'>";
  //VOU BUSCAR DADOS
  getCity();
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

function getCity() {
  var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + PosCor[0] + "&lon=" +  PosCor[1] + "&appid=" + APIkey + "&units=metric";
  console.log(weatherAPI);

    $.ajax({
      url:   weatherAPI,
      dataType: "json",
      success: function(data) {
        console.log(data);
        document.getElementById("city").innerHTML = "<strong>"+data.name+"</strong>";
        document.getElementById("Temp").innerHTML = ""+data.main.temp.toFixed(2)+" ºC";
        document.getElementById("weather").innerHTML = "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>"+data.weather[0].description+"";
        document.getElementById("humidity").innerHTML = "<img src='http://www.freedomgrow.pt/dnn/portals/fg/images/Temperature-and-Humidity.png'>"+data.main.humidity+" %";
        document.getElementById("wind").innerHTML = "<img src='http://www.strantech.com/wp-content/uploads/2013/04/icon-wind.png'>"+data.wind.speed+" m/s "+ degToCard(data.wind.deg);
      }
    });
  }


$( ".btn" ).click(function() {
  var old= parseFloat($( "#Temp" ).html().split(" "));
  if($( "#Temp" ).hasClass( "celsius" ))
  {
    newTemp=1.8*old+32;
    $( "#Temp" ).removeClass( "celsius" );
    $( "#Temp" ).addClass( "fahrenheit" );
    $( "#Temp" ).html(newTemp.toFixed(2)+" ºF");
  }
  else if($( "#Temp" ).hasClass( "fahrenheit" ))
  {
    newTemp=(old-32)/1.8;
    $( "#Temp" ).removeClass( "fahrenheit" );
    $( "#Temp" ).addClass( "celsius" );
    $( "#Temp" ).html(newTemp.toFixed(2)+" ºC");
  }
});

var degToCard = function(deg){
  if (deg>22.5 && deg<67.55){
    return "NE";
  }else if (deg>67.5 && deg<112.5){
    return "E";
  }else if (deg>112.5 && deg<157.5){
    return "SE";
  }else if (deg>157.5 && deg<202.5){
    return "S";
  }else if (deg>202.5 && deg<247.5){
    return "SW";
  }else if (deg>247.5 && deg<292.5){
    return "W";
  }else if (deg>292.5 && deg<337.5){
    return "NW";
  }else if (deg>360 || deg<0){
    return "null";
  }else{
    return "N";
  }
}
