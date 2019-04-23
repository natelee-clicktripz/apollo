import { combineReducers } from 'redux'
import {
    REQUEST_FORECASTS,
    REQUEST_RESTAURANTS,
    LOADING_START,
    LOADING_DONE
} from '../actions'

function setData(
  state = {
    weathers: [],
    restaurants: [],
    isLoading: false
  },
  action
) {
  switch (action.type) {
    case REQUEST_FORECASTS:
        let weathers = action.forecasts.weather ? JSON.parse(action.forecasts.weather).list : JSON.parse(action.forecasts).list;

        weathers = weathers.filter((weather) => {
            if(/(09|12|18):00:00/.test(weather.dt_txt)) {
                return true;
            }

            return false;
        })

      return Object.assign({}, state, {
        weathers,
      })
    case REQUEST_RESTAURANTS:
      return Object.assign({}, state, {
        restaurants: action.restaurants.yelp ? JSON.parse(action.restaurants.yelp).data.search.business : JSON.parse(action.restaurants).data.search.business,
      })

    case LOADING_START:
        return Object.assign({}, state, {
            isLoading: true
        })
    case LOADING_DONE:
        return Object.assign({}, state, {
            isLoading: false
        })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  setData
})

export default rootReducer