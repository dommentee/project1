
const key = '7d1e5512c847d1c72badc10dcb9d5e71'
// (284.6K − 273.15) × 9/5 + 32


let cityName = '';
let stateCode = '';
let countryCode = '';


const options = {//code i got from MDN
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
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`//same api different call method
  }).then(
    (data) => {
      console.log(data)
      const temperature = Math.round(data.main.temp - 273.15) * 9 / 5 + 32
      $('#city').text(data.name).css('text-transform', 'uppercase')
      const getFahrenheit = (kelvin) => {
        fahrenheitTemp = Math.round((kelvin - 273.15) * 9 / 5 + 32)
        return fahrenheitTemp
      }
      $('#temp').text(getFahrenheit(data.main.temp))
      $('#min').text(getFahrenheit(data.main.temp_min))
      $('#max').text(getFahrenheit(data.main.temp_max))
      $('#feels').text(getFahrenheit(data.main.feels_like))
      $('#conditions').text(data.weather[0].description)
      // console.log(data.name);
      
    },
    () => {
      console.log('no data');
    }
  )
}

function error(err) {//code i got from mdn
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
      const getFahrenheit = (kelvin) => {
        fahrenheitTemp = Math.round((kelvin - 273.15) * 9 / 5 + 32)
        return fahrenheitTemp
      }
      $('#city').text(data.name).css('text-transform', 'uppercase')
      $('#temp').text(getFahrenheit(data.main.temp))
      $('min')
      $('max')
      $('feels')
      $('conditions')
    },
    () => {
      console.log('no data');
    }
  )
  
}


$(() => {
  const $modal = $('.modal')
  const $searchBtn = $('#search').on('click', function () {
    $modal.css('display', 'block')
  })
  const $closeBtn = $('.closebtn').on('click', function () {
    $modal.css('display', 'none')
  })
  

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
    $modal.css('display', 'none');
  })


})

