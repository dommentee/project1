
const key = '7d1e5512c847d1c72badc10dcb9d5e71'

let cityName = '';
let stateCode = '';
let countryCode = '';
let tempType = 'fahrenheit'


const getFahrenheit = (kelvin) => {//function to change temp to fahrenheit
  fahrenheitTemp = Math.round((kelvin - 273.15) * 9 / 5 + 32)
  return fahrenheitTemp
}
const getCelcius = (kelvin) => {//function to change temp to fahrenheit
  celciusTemp = Math.round(kelvin - 273.15)
  return celciusTemp
}

const options = {//code i got from MDN
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const sucess = (pos) => {
  let coordnates = pos.coords
  let lat = coordnates.latitude
  let long = coordnates.longitude
  console.log(coordnates);

  $.ajax({//
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`//same api different call method
  }).then(
    (data) => {
      $('#loading').remove()
      console.log(data)
      $('#city').text(data.name).css('text-transform', 'uppercase')
      $('#conditions').text(data.weather[0].description)
      
      $('#image').attr("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);//finds the id of the image

      $('#temp').text(getFahrenheit(data.main.temp))
      $('#min').text(getFahrenheit(data.main.temp_min))
      $('#max').text(getFahrenheit(data.main.temp_max))
      $('#feels').text(getFahrenheit(data.main.feels_like))
      
      $('#tuggle').on('click', (e) => {//toggle type
        // console.log(tempType);
        if (tempType === 'fahrenheit') {
          tempType = 'celcius' 
          $('#tuggle').css('background-color', 'rgb(241, 87, 67)').text('fahrenheit')
          $('#temp').text(getCelcius(data.main.temp))
          $('#min').text(getCelcius(data.main.temp_min))
          $('#max').text(getCelcius(data.main.temp_max))
          $('#feels').text(getCelcius(data.main.feels_like))
        } else {
          tempType = 'fahrenheit'
          console.log(tempType);
          $('#tuggle').css('background-color', 'rgba(27, 141, 255, 0.966)').text('celcius')
          $('#temp').text(getFahrenheit(data.main.temp))
          $('#min').text(getFahrenheit(data.main.temp_min))
          $('#max').text(getFahrenheit(data.main.temp_max))
          $('#feels').text(getFahrenheit(data.main.feels_like))
        }
      })    
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
    url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&appid=${key}`
  
  }).then(
    (data) => {
      console.log(data)
      $('#city').text(data.name).css('text-transform', 'uppercase')
      $('#temp').text(getFahrenheit(data.main.temp))
      $('#min').text(getFahrenheit(data.main.temp_min))
      $('#max').text(getFahrenheit(data.main.temp_max))
      $('#feels').text(getFahrenheit(data.main.feels_like))
      $('#conditions').text(data.weather[0].description)
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

