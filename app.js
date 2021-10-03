// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}
//(291.01K − 273.15) × 9/5 + 32

const key = '7d1e5512c847d1c72badc10dcb9d5e71'

let cityName = 'tokyo';
let stateCode = '';
let countryCode = 'jp'

const setStatperm = () => {
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
  const $cityInput = $('#city-name').on('keyup', function () {
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
    console.log(cityName);
    console.log(stateCode);
    console.log(countryCode);
  }) 
  setStatperm ()
  
})

