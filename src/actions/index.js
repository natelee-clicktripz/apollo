export const REQUEST_FORECASTS = 'REQUEST_FORECASTS'
export const REQUEST_RESTAURANTS = 'REQUEST_RESTAURANTS'

function setForecasts(forecasts) {
  return {
    type: REQUEST_FORECASTS,
    forecasts
  }
}

function setRestaurants(restaurants) {
  return {
    type: REQUEST_RESTAURANTS,
    restaurants
  }
}

export function fetchForecasts(location) {
  return dispatch => {
     fetch(`http://localhost:8000/api/weather/?location=${location}`)
      .then(response => response.json())
      .then(json => dispatch(setForecasts(json)))
  }
}

export function fetchRestaurants(location) {
  return dispatch => {
     fetch(`http://localhost:8000/api/yelpsearch/?location=${location}`)
      .then(response => response.json())
      .then(json => dispatch(setRestaurants(json)))
  }
}

// export function fetchRestaurantsAndForecasts(location) {
//     fetchRestaurants(location);
//     fetchForecasts(location);
// }