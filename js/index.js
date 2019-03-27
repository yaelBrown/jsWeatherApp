// Get browser location
window.addEventListener('load', ()=> {
  let long;
  let lat;

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
        });
    })
  } else {
   console.log("It's not working");
  }
})