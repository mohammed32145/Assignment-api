
var day = document.querySelector(`#day`);
var x = day.closest(`.num1`).nextElementSibling;
var nextDay = x.children[0].children[0].children[0];
var next_next_day = x.nextElementSibling.children[0].children[0].children[0];
var search = document.querySelector(`#search`);
var country = document.querySelector(`#country`);
var temp = country.nextElementSibling.children[0];
var ccolone = document.querySelector(`#ccolone`);
var imgcolone = document.querySelector(`#imgcolone`);
var textcolone = document.querySelector(`#textcolone`);
var maxcolt = document.querySelector(`#maxcolt`);
var mincolt = maxcolt.nextElementSibling;
var textcolt = mincolt.nextElementSibling;
var iconcolt = maxcolt.previousElementSibling.children[0];
var maxcolthree = document.querySelector(`#maxcolthree`);
var mincolthree = maxcolthree.nextElementSibling;
var textcolthree = mincolthree.nextElementSibling;
var iconcolthree = maxcolthree.previousElementSibling.children[0];

var today = new Date();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayName = days[today.getDay()];
var dayDate = today.getDate();
var monthName = months[today.getMonth()];

day.textContent = dayName;
day.nextElementSibling.textContent = `${dayDate} ${monthName}`;

var nextDayIndex = (today.getDay() + 1) % 7;
nextDay.textContent = days[nextDayIndex];
var nextNextDatIndex = (today.getDay() + 2) % 7;
next_next_day.textContent = days[nextNextDatIndex];

var response = [];
var place;
var locationName;

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      fetchWeatherByCoordinates(lat, lon); 
    }, function(error) {
      console.log('خطأ في الحصول على الموقع:', error);
    });
  } else {
    console.log('الموقع الجغرافي غير مدعوم في هذا المتصفح');
  }
}

function fetchWeatherByCoordinates(lat, lon) {
  var url = `http://api.weatherapi.com/v1/forecast.json?key=d758977a9b7f4bb8bb295800241612&q=${lat},${lon}&days=3`;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();  

  xhr.addEventListener('load', function() {
    response = JSON.parse(xhr.responseText);

    if (response.location) {
      locationName = response.location.country.toLowerCase();
      country.textContent = response.location.country;
      ccolone.textContent = response.current.temp_c;
      imgcolone.setAttribute("src", response.current.condition.icon);
      textcolone.textContent = response.current.condition.text;
      maxcolt.textContent = response.forecast.forecastday[1].day.maxtemp_c + "°C";
      mincolt.textContent = response.forecast.forecastday[1].day.mintemp_c + "°";
      iconcolt.setAttribute("src", response.forecast.forecastday[1].day.condition.icon);
      textcolt.textContent = response.forecast.forecastday[1].day.condition.text;
      maxcolthree.textContent = response.forecast.forecastday[2].day.maxtemp_c + "°C";
      mincolthree.textContent = response.forecast.forecastday[2].day.mintemp_c + "°";
      textcolthree.textContent = response.forecast.forecastday[2].day.condition.text;
      iconcolthree.setAttribute("src", response.forecast.forecastday[2].day.condition.icon);
    }
  });
}

getUserLocation();

search.addEventListener('input', function() {
  place = search.value;
  var url = `http://api.weatherapi.com/v1/forecast.json?key=d758977a9b7f4bb8bb295800241612&q=${place}&days=3`;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(); 

  xhr.addEventListener('load', function() {
    response = JSON.parse(xhr.responseText);
    console.log(response); 

  
    if (response.location) {
      locationName = response.location.country.toLowerCase();
      var searchTerm = place.toLowerCase();
      if (locationName.includes(searchTerm)) {
        country.textContent = response.location.country;
        ccolone.textContent = response.current.temp_c;
        imgcolone.setAttribute("src", response.current.condition.icon);
        textcolone.textContent = response.current.condition.text;
        maxcolt.textContent = response.forecast.forecastday[1].day.maxtemp_c + "°C";
        mincolt.textContent = response.forecast.forecastday[1].day.mintemp_c + "°";
        iconcolt.setAttribute("src", response.forecast.forecastday[1].day.condition.icon);
        textcolt.textContent = response.forecast.forecastday[1].day.condition.text;
        maxcolthree.textContent = response.forecast.forecastday[2].day.maxtemp_c + "°C";
        mincolthree.textContent = response.forecast.forecastday[2].day.mintemp_c + "°";
        textcolthree.textContent = response.forecast.forecastday[2].day.condition.text;
        iconcolthree.setAttribute("src", response.forecast.forecastday[2].day.condition.icon);
      }
    }
  });
});



