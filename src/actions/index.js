export const REQUEST_FORECASTS = 'REQUEST_FORECASTS'
export const REQUEST_RESTAURANTS = 'REQUEST_RESTAURANTS'
export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'

function setForecasts(forecasts) {
  return {
    type: REQUEST_FORECASTS,
    forecasts,
    isLoading: true
  }
}

function setRestaurants(restaurants) {
  return {
    type: REQUEST_RESTAURANTS,
    restaurants,
    isLoading: true
  }
}

function isDoneLoading() {
    return {
        type: LOADING_DONE,
        isLoading: false
    }
}

export function setDoneLoading() {
    return dispatch => {
        return dispatch(isDoneLoading());
    }
}

export function fetchForecasts(location) {
  return dispatch => {
      let cache = window.location.search.replace(/\?/, '');
      let weatherURL = `http://localhost:8000/api/weather/?location=${location}`;

      if(cache) {
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
     return fetch(`http://localhost:8000/api/yelpsearch/?location=${location}`)
      .then(response => response.json())
      .then(json => dispatch(setRestaurants(json)))
      .then(() => {
          dispatch(isDoneLoading());
      })
  }
}

export function fetchRestaurantsAndForecasts(location) {
    return dispatch => {
      let cache = window.location.search.replace(/\?/, '');
      let weatherURL = `http://localhost:8000/api/weather/?location=${location}`;

      if(cache) {
          weatherURL += `&${cache}`;
      }

     return fetch(weatherURL)
      .then(response => response.json())
      .then(json => dispatch(setForecasts(json)))
      .then(() => {
          return fetch(`http://localhost:8000/api/yelpsearch/?location=${location}`)
      })
      .then(response => response.json())
      .then(json => dispatch(setRestaurants(json)))
      .then(() => {
          dispatch(setDoneLoading())
      })
  }
}