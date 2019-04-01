// Get browser location
window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature-section');
  const temperatureSpan = document.querySelector('.temperature-section span');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      // CORS proxy to prevent cors errors. 
      const proxy = 'https://cors-anywhere.herokuapp.com/';

      // darksky.net api call with long and lat
      // use tilde's with the variables in strings
      const api = `${proxy}https://api.darksky.net/forecast/3a3c1b32f4117f09303b866e6843c330/${lat},${long}`;

      fetch(api)
        .then(response =>{
        return response.json();
      })
        .then(data => {
          console.log(data);
          // ES6 way of pulling data under currently. 
          // Only pulling temperature and summary
          const { temperature, summary, icon } = data.currently;

          // Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;

          // Also removes underscores and dashes
          locationTimezone.textContent = data.timezone.replace(/[_-]/g, " ");

          // Set Icons
          setIcons(icon, document.querySelector('.icon'));

          // Formula for Celsius
          let celsius = (temperature - 32) * (5/9);

          // Change temperature to celsius/fahrenheit
          temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          })

        });
    })
  } else {
   console.log("It's not working");
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({"color": "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
})