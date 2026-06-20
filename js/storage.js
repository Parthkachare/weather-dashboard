// ==========================
// STORAGE KEY
// ==========================

const STORAGE_KEY =
    "weatherDashboardPreferences";


// ==========================
// DEFAULT SETTINGS
// ==========================

const defaultPreferences = {

    favoriteCity: "Pune",

    theme: "light"

};


// ==========================
// SAVE PREFERENCES
// ==========================

function savePreferences(preferences) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(preferences)

    );

}


// ==========================
// LOAD PREFERENCES
// ==========================

function loadPreferences() {

    const preferences =

        localStorage.getItem(
            STORAGE_KEY
        );

    if (preferences) {

        return JSON.parse(
            preferences
        );

    }

    return defaultPreferences;

}


// ==========================
// SAVE FAVORITE CITY
// ==========================

function saveFavoriteCity(city) {

    const preferences =

        loadPreferences();

    preferences.favoriteCity =
        city;

    savePreferences(
        preferences
    );

}


// ==========================
// LOAD FAVORITE CITY
// ==========================

function loadFavoriteCity() {

    const preferences =

        loadPreferences();

    document.getElementById(
        "favoriteCity"
    ).textContent =

        `Favorite City : ${preferences.favoriteCity}`;

}


// ==========================
// SAVE THEME
// ==========================

function saveTheme(theme) {

    const preferences =

        loadPreferences();

    preferences.theme =
        theme;

    savePreferences(
        preferences
    );

}


// ==========================
// LOAD THEME
// ==========================

function loadTheme() {

    const preferences =

        loadPreferences();

    if (
        preferences.theme ===
        "dark"
    ) {

        document.body.classList.add(
            "dark-theme"
        );

        document.getElementById(
            "themeButton"
        ).textContent = "☀️";

    }

}


// ==========================
// TOGGLE THEME
// ==========================

function toggleTheme() {

    document.body.classList.toggle(
        "dark-theme"
    );

    if (
        document.body.classList.contains(
            "dark-theme"
        )
    ) {

        saveTheme(
            "dark"
        );

        document.getElementById(
            "themeButton"
        ).textContent = "☀️";

    }

    else {

        saveTheme(
            "light"
        );

        document.getElementById(
            "themeButton"
        ).textContent = "🌙";

    }

}


// ==========================
// INITIALIZE STORAGE
// ==========================

function initializeStorage() {

    loadTheme();

    loadFavoriteCity();

}