const apiKey = 'd272a0988ec3dcbcf1f51d24ab77af55'
const dataContainer = document.querySelector('.data-container')
const submitBtn = document.getElementById('search-button')
const icon = document.querySelector('.icon')
const body = document.getElementsByTagName('body')[0]
const farenheitBtn = document.getElementById('farenheit-button')
const celsiusBtn = document.getElementById('celsius-button')
const weatherIcons = {
    rain: '<i class="las la-cloud-rain"></i>',
    clear_sky: '<i class="las la-sun"></i>',
    mixed_sun_cloud: '<i class="las la-cloud-sun"></i>',
    heavy_rain: '<i class="las la-cloud-showers-heavy"></i>',
    storm: '<i class="las la-bolt"></i>',
    clouds: '<i class="las la-cloud"></i>'
}

 function getWeather(query) {
    if(query === '') {
        alert('Please enter a city')
        return
    } else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}`, { mode: 'cors'} )
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const cityName = document.getElementById('city-name')
            cityName.textContent = `${data.name}`

            const weather = document.getElementById('main-weather')
            weather.textContent = `${data.weather[0].description}`

            const temp = document.getElementById('temperature')
            temp.textContent = `${kToC(data.main.temp)} °C`

            const feelsLike = document.getElementById('feels-like')
            feelsLike.textContent = `Feels like: ${kToC(data.main.feels_like)} °C`

            const humidity = document.getElementById('humidity')
            humidity.textContent = `Humidity: ${data.main.humidity} %`

            farenheitBtn.style.display = 'block'

            farenheitBtn.addEventListener('click', function(){
                feelsLike.textContent = `Feels Like: ${kToF(data.main.feels_like)} °F`
                temp.textContent = `${kToF(data.main.temp)} °F`

                farenheitBtn.style.display = 'none'
                celsiusBtn.style.display = 'block'
            })

            celsiusBtn.addEventListener('click', function(){
                feelsLike.textContent = `Feels Like: ${kToC(data.main.feels_like)} °C`
                temp.textContent = `${kToC(data.main.temp)} °C`

                farenheitBtn.style.display = 'block'
                celsiusBtn.style.display = 'none'
            })

            return data.weather[0].description
        })    
        .then((description) => {
            switch(description) {
                case 'broken clouds':
                    icon.innerHTML = weatherIcons.clouds
                    break;
                case 'overcast clouds':
                    icon.innerHTML = weatherIcons.clouds
                    break;
                case 'scattered clouds':
                    icon.innerHTML = weatherIcons.clouds
                    break;
                case 'clear sky':
                    icon.innerHTML = weatherIcons.clear_sky
                    break;
                case 'few clouds':
                    icon.innerHTML = weatherIcons.mixed_sun_cloud
                    break;
                case 'rain':
                    icon.innerHTML = weatherIcons.rain
                    break;
                case 'light rain':
                    icon.innerHTML = weatherIcons.rain
                    break;
                case 'thunderstorm with rain':
                    icon.innerHTML = weatherIcons.storm
                    break; 
                case 'thunderstorm':
                    icon.innerHTML = weatherIcons.storm
                    break;    
                    default:
                    icon.innerHTML = ''
            }
        })
    }
}

function kToC(k) {
    const temp = k - 273.15
    return temp.toFixed(1)
}

function kToF(k) {
    const temp = (k - 273) * 9/5 + 32
    return temp.toFixed(1)
}

function search() {
    const city = document.getElementById('city-input')
    getWeather(city.value)
    city.value = ''
}


submitBtn.addEventListener('click', search)

