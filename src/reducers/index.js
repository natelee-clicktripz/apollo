import { combineReducers } from 'redux'
import {
    REQUEST_FORECASTS,
    REQUEST_RESTAURANTS,
    LOADING_DONE,
    ENABLE_ERROR,
    DISABLE_ERROR
} from '../actions'

function setData(
    state = {
        weathers: [],
        restaurants: [],
        isLoading: false,
        error: false,
        searched: false
    },
    action
) {
    switch (action.type) {
        case REQUEST_FORECASTS:
            let weathers = action.forecasts.weather ? JSON.parse(action.forecasts.weather).errors ? [] : JSON.parse(action.forecasts.weather).list : JSON.parse(action.forecasts).list;

            weathers = weathers.filter((weather) => {
                if (/(09|12|18):00:00/.test(weather.dt_txt)) {
                    return true;
                }

                return false;
            })

            return Object.assign({}, state, {
                weathers,
                searched: action.searched,
            })

        case REQUEST_RESTAURANTS:
            let restaurants = action.restaurants.yelp ? JSON.parse(action.restaurants.yelp).errors ? [] : JSON.parse(action.restaurants.yelp).data.search.business : JSON.parse(action.restaurants).data.search.business;

            return Object.assign({}, state, {
                restaurants,
                searched: action.searched,
            })

        case LOADING_DONE:
            return Object.assign({}, state, {
                isLoading: false
            })
        case ENABLE_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                msg: action.msg
            })
        case DISABLE_ERROR:
            return Object.assign({}, state, {
                error: action.error,
                msg: ''
            })
        default:
            return state
    }
}

const rootReducer = combineReducers({
    setData
})

export default rootReducer