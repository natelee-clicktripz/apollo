import { combineReducers } from 'redux'
import {
    REQUEST_FORECASTS,
    REQUEST_RESTAURANTS
} from '../actions'

function setData(
  state = {
    weathers: [],
    restaurants: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_FORECASTS:
      return Object.assign({}, state, {
        weathers: action.weather ? JSON.parse(action.weather).list : !action.errors ? JSON.parse(action).list : []
      })
    case REQUEST_RESTAURANTS:
      return Object.assign({}, state, {
        restaurants: action.yelp ? JSON.parse(action.yelp).data.search.business : !action.errors ? JSON.parse(action).data.search.business : []
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  setData
})

export default rootReducer