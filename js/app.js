// ==========================
// ELEMENTS
// ==========================

const searchButton =
    document.getElementById(
        "searchButton"
    );

const cityInput =
    document.getElementById(
        "cityInput"
    );

const themeButton =
    document.getElementById(
        "themeButton"
    );

const saveFavoriteButton =
    document.getElementById(
        "saveFavoriteButton"
    );


// ==========================
// SEARCH WEATHER
// ==========================

async function searchWeather() {

    const city =
        cityInput.value.trim();

    if (city === "") {

        showError(
            "Please enter a city name."
        );

        return;

    }

    try {

        showLoading();

        document.getElementById(
            "errorMessage"
        ).textContent = "";

        const weather =
            await fetchWeatherData(
                city
            );

        displayCurrentWeather(
            weather
        );

        displayForecast(
            weather
        );

        hideLoading();

    }

    catch (error) {

        hideLoading();

        showError(
            error.message
        );

    }

}


// ==========================
// SAVE FAVORITE CITY
// ==========================

function handleFavoriteCity() {

    const currentCity =
        document.getElementById(
            "cityName"
        ).textContent;

    if (
        currentCity !== "City"
    ) {

        saveFavoriteCity(
            currentCity
        );

        loadFavoriteCity();

    }

}


// ==========================
// ENTER KEY SUPPORT
// ==========================

cityInput.addEventListener(

    "keypress",

    function (event) {

        if (
            event.key === "Enter"
        ) {

            searchWeather();

        }

    }

);


// ==========================
// SEARCH BUTTON
// ==========================

searchButton.addEventListener(

    "click",

    searchWeather

);


// ==========================
// THEME BUTTON
// ==========================

themeButton.addEventListener(

    "click",

    toggleTheme

);


// ==========================
// FAVORITE BUTTON
// ==========================

saveFavoriteButton.addEventListener(

    "click",

    handleFavoriteCity

);


// ==========================
// INITIALIZE APPLICATION
// ==========================

window.addEventListener(

    "load",

    async function () {

        initializeStorage();

        const preferences =
            loadPreferences();

        cityInput.value =
            preferences.favoriteCity;

        try {

            showLoading();

            const weather =
                await fetchWeatherData(
                    preferences.favoriteCity
                );

            displayCurrentWeather(
                weather
            );

            displayForecast(
                weather
            );

            hideLoading();

        }

        catch (error) {

            hideLoading();

            showError(
                "Unable to load weather data."
            );

        }

    }

);


// ==========================
// CLEAR ERROR MESSAGE
// ==========================

cityInput.addEventListener(

    "input",

    function () {

        document.getElementById(
            "errorMessage"
        ).textContent = "";

    }

);


// ==========================
// REUSABLE MESSAGE FUNCTION
// ==========================

function showSuccessMessage(
    message
) {

    console.log(
        message
    );

}


// ==========================
// APPLICATION READY
// ==========================

console.log(
    "Weather Dashboard Loaded Successfully"
);