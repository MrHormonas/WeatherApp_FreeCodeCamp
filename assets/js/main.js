var APIkey = "d960df4869f4f5b6c5fc49e3d479cbfe";

$(document).ready(function(){
  getLocation();
  var cw = $('#map').width();
  $('#map').css({'height':cw+'px'});
});

$( window ).resize(function() {
  getLocation();
  var cw = $('#map').width();
  $('#map').css({'height':cw+'px'});
});


function getLocation() {
  var locApiUrl = "http://ip-api.com/json";

  $.ajax({
    url:   locApiUrl,
    dataType: "json",
    success: function(data) {
      getCity(data.city);
      initMap(data.lat, data.lon)
    }
  });
}

function getCity(city) {
  var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=";
  weatherAPI += encodeURIComponent(city);
  weatherAPI += "&appid=" + APIkey + "&units=metric";

  $.ajax({
    url:   weatherAPI,
    dataType: "json",
    success: function(data) {
      console.log(data);
      document.getElementById("city").innerHTML = "<strong>"+data.name+"</strong>";
      document.getElementById("Temp").innerHTML = ""+data.main.temp.toFixed(2)+" ºC";
      document.getElementById("weather").innerHTML = getIcon(data.weather[0]) + " " + data.weather[0].description+"";
      document.getElementById("humidity").innerHTML = "<i class='wi wi-humidity'></i> "+data.main.humidity+" %";
      document.getElementById("wind").innerHTML = "<i class='wi wi-strong-wind'></i> "+data.wind.speed+" m/s "+ degToCard(data.wind.deg);
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

function degToCard(deg){
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

function initMap(latitude, longitude) {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: Number(latitude), lng: Number(longitude)},
    scrollwheel: false,
    zoom: 13
  });
}

function getIcon(code){
  var str = "<i class='wi ";
  switch(code.icon)
  {
    case "01d": str += "wi-day-sunny"; break;
    case "02d": str += "wi-day-cloudy"; break;
    case "03d": str += "wi-cloud"; break;
    case "04d": str += "wi-cloudy"; break;
    case "09d": str += "wi-sleet"; break;
    case "10d": str += "wi-day-sleet"; break;
    case "11d": str += "wi-storm-showers"; break;
    case "13d": str += "wi-snow"; break;
    case "50d": str += "wi-dust"; break;
    case "01n": str += "wi-night-sunny"; break;
    case "02n": str += "wi-night-cloudy"; break;
    case "03n": str += "wi-cloud"; break;
    case "04n": str += "wi-cloudy"; break;
    case "09n": str += "wi-sleet"; break;
    case "10n": str += "wi-night-sleet"; break;
    case "11n": str += "wi-storm-showers"; break;
    case "13n": str += "wi-snow"; break;
    case "50n": str += "wi-dust"; break;
  }
  str += "'></i>"

console.log(str)
  return str;
}
