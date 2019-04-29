export const REQUEST_FORECASTS = 'REQUEST_FORECASTS'
export const REQUEST_RESTAURANTS = 'REQUEST_RESTAURANTS'
export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const ENABLE_ERROR = 'ENABLE_ERROR'
export const DISABLE_ERROR = 'DISABLE_ERROR'

function setForecasts(forecasts) {
    return {
        type: REQUEST_FORECASTS,
        forecasts,
        isLoading: true,
        searched: true
    }
}

function setRestaurants(restaurants) {
    return {
        type: REQUEST_RESTAURANTS,
        restaurants,
        isLoading: true,
        searched: true
    }
}

function isDoneLoading() {
    return {
        type: LOADING_DONE,
        isLoading: false
    }
}

function toggleErrorMessage(msg) {
    return {
        type: ENABLE_ERROR,
        error: true,
        msg
    }
}

function detoggleErrorMessage() {
    return {
        type: DISABLE_ERROR,
        error: false
    }
}

export function setDoneLoading() {
    return dispatch => {
        return dispatch(isDoneLoading());
    }
}

export function setErrorMessage(msg) {
    return dispatch => {
        return dispatch(toggleErrorMessage(msg))
    }
}

export function unsetErrorMessage() {
    return dispatch => {
        return dispatch(detoggleErrorMessage())
    }
}

export function fetchForecasts(location) {
    return dispatch => {
        let cache = window.location.search.replace(/\?/, '');
        let baseURL = 'http://localhost:8000';
        if(window.location.hostname !== 'localhost') {
            baseURL = 'http://138.68.254.146:8000';
        }
        let weatherURL = `${baseURL}/api/weather/?location=${location}`;

        if (cache) {
            weatherURL += `&${cache}`;
        }

        return fetch(weatherURL)
            .then(response => response.json())
            .then(json => dispatch(setForecasts(json)))
            .then(() => {
                dispatch(isDoneLoading());
            })
    }
}

export function fetchRestaurants(location) {
    return dispatch => {
        let baseURL = 'http://localhost:8000';
        if(window.location.hostname !== 'localhost') {
            baseURL = 'http://138.68.254.146:8000';
        }
        return fetch(`${baseURL}/api/yelpsearch/?location=${location}`)
            .then(response => response.json())
            .then(json => dispatch(setRestaurants(json)))
            .then(() => {
                dispatch(isDoneLoading());
            })
    }
}

export function fetchRestaurantsAndForecasts(location) {
    return dispatch => {
        console.log(location);
        let baseURL = 'http://localhost:8000';
        if(window.location.hostname !== 'localhost') {
            baseURL = 'http://138.68.254.146:8000';
        }
        let cache = window.location.search.replace(/\?/, '');
        let weatherURL = `${baseURL}/api/weather/?location=${location}`;

        if (cache) {
            weatherURL += `&${cache}`;
        }

        return fetch(weatherURL)
            .then(response => response.json())
            .then(json => dispatch(setForecasts(json)))
            .then(() => {
                return fetch(`${baseURL}/api/yelpsearch/?location=${location}`)
            })
            .then(response => response.json())
            .then(json => dispatch(setRestaurants(json)))
            .then(() => {
                dispatch(setDoneLoading())
            })
    }
}