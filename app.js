
const key = '7d1e5512c847d1c72badc10dcb9d5e71'

let cityName = 'tokyo';
let stateCode = '';
let countryCode = 'jp'

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

const getUserLocation = () => {

}

// $.ajax({
//   url: `http://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode},${countryCode}&appid=${key}`

// }).then(
//   (data) => {
//     console.log(data)
//   },
//   () => {
//     console.log('no data');
//   }
// )


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

