
const key = '7d1e5512c847d1c72badc10dcb9d5e71'

let cityName = '';
let stateCode = '';
let countryCode = '';

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const sucess = (pos) => {
  let coordnates = pos.coords
  let lat = coordnates.latitude
  let long = coordnates.longitude
  console.log('loading....');
  console.log(coordnates);

  $.ajax({//one 
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`
  }).then(
    (data) => {

      console.log(data)
      // console.log(data.name);
      
    },
    () => {
      console.log('no data');
    }
  )
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(sucess, error, [options])

const setStatperm = () => {// function that connect to the api
  console.log('loading....');
  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&appid=${key}`
  
  }).then(
    (data) => {
      console.log(data)
    },
    () => {
      console.log('no data');
    }
  )
  
}


$(() => {
  const $cityInput = $('#city-name').on('keyup', function () {// sets the city
    if ($(this).val()) {
      cityName =  $(this).val()
    }
  })
  const $stateInput = $('#state-code').on('keyup', function () {
    if ($(this).val()) {
      stateCode =  $(this).val()
    } 
  })
  const $countryInput = $('#country-code').on('keyup', function () {
    if ($(this).val()) {
      countryCode =  $(this).val()
    } 
  })
  
  $('form').on('submit', (e) => {
    e.preventDefault();
    setStatperm()//calls functions that starts api
    $('#form').trigger('reset')//form/inputs 
    
  })
})

