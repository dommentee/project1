// api.openweathermap.org/data/2.5/weather?q={city name},{state code}&appid={API key}
//(291.01K − 273.15) × 9/5 + 32
console.log('hello');

const key = '7d1e5512c847d1c72badc10dcb9d5e71'

let cityName = 'tokyo';
let stateCode = '';
let countryCode = 'jp'

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


$(() => {

})

