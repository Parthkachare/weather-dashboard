// ==========================
// API CONFIGURATION
// ==========================

const BASE_URL =
    "https://api.open-meteo.com/v1/forecast";

const GEOCODING_URL =
    "https://geocoding-api.open-meteo.com/v1/search";


// ==========================
// GET CITY COORDINATES
// ==========================

async function getCoordinates(city) {

    try {

        const response =
            await fetch(
                `${GEOCODING_URL}?name=${city}&count=1`
            );

        if (!response.ok) {

            throw new Error(
                "Unable to find city"
            );

        }

        const data =
            await response.json();

        if (!data.results) {

            throw new Error(
                "City not found"
            );

        }

        return {

            latitude:
                data.results[0].latitude,

            longitude:
                data.results[0].longitude,

            cityName:
                data.results[0].name

        };

    }

    catch (error) {

        throw error;

    }

}


// ==========================
// FETCH WEATHER DATA
// ==========================

async function fetchWeatherData(city) {

    try {

        const coordinates =
            await getCoordinates(city);

        const latitude =
            coordinates.latitude;

        const longitude =
            coordinates.longitude;

        const response =
            await fetch(

                `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=5`

            );

        if (!response.ok) {

            throw new Error(
                "Weather data unavailable"
            );

        }

        const data =
            await response.json();

        return {

            city:
                coordinates.cityName,

            currentTemperature:
                data.current.temperature_2m,

            humidity:
                data.current.relative_humidity_2m,

            windSpeed:
                data.current.wind_speed_10m,

            forecastDates:
                data.daily.time,

            maxTemperature:
                data.daily.temperature_2m_max,

            minTemperature:
                data.daily.temperature_2m_min

        };

    }

    catch (error) {

        throw error;

    }

}


// ==========================
// DISPLAY CURRENT WEATHER
// ==========================

function displayCurrentWeather(weather) {

    document.getElementById(
        "cityName"
    ).textContent =
        weather.city;

    document.getElementById(
        "temperature"
    ).textContent =
        `Temperature : ${weather.currentTemperature} °C`;

    document.getElementById(
        "humidity"
    ).textContent =
        `Humidity : ${weather.humidity}%`;

    document.getElementById(
        "windSpeed"
    ).textContent =
        `Wind Speed : ${weather.windSpeed} km/h`;

    document.getElementById(
        "description"
    ).textContent =
        "Current Weather Information";

}


// ==========================
// DISPLAY FORECAST
// ==========================

function displayForecast(weather) {

    const forecastContainer =
        document.getElementById(
            "forecastContainer"
        );

    forecastContainer.innerHTML =
        "";

    for (
        let i = 0;
        i < weather.forecastDates.length;
        i++
    ) {

        const card =
            document.createElement(
                "div"
            );

        card.classList.add(
            "forecast-card"
        );

        card.innerHTML =

            `
            <h3>${weather.forecastDates[i]}</h3>

            <p>
            Max Temp :
            ${weather.maxTemperature[i]} °C
            </p>

            <p>
            Min Temp :
            ${weather.minTemperature[i]} °C
            </p>
            `;

        forecastContainer.appendChild(
            card
        );

    }

}


// ==========================
// LOADING STATE
// ==========================

function showLoading() {

    document.getElementById(
        "loading"
    ).style.display =
        "block";

}


function hideLoading() {

    document.getElementById(
        "loading"
    ).style.display =
        "none";

}


// ==========================
// ERROR MESSAGE
// ==========================

function showError(message) {

    document.getElementById(
        "errorMessage"
    ).textContent =
        message;

}