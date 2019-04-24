import { combineReducers } from 'redux'
import {
    REQUEST_FORECASTS,
    REQUEST_RESTAURANTS,
    LOADING_DONE,
    ENABLE_ERROR,
    DISABLE_ERROR
} from '../actions'
import get from 'lodash/get';

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
            let weathers;
            if(action.forecasts.weather) {
                if(JSON.parse(action.forecasts.weather).errors) {
                    weathers = [];
                } else {
                    weathers = get(JSON.parse(action.forecasts.weather), 'list', []);
                }
            } else {
                weathers = get(JSON.parse(action.forecasts), 'list', []);
            }

            if(weathers.length) {
                weathers = weathers.filter((weather) => {
                    if (/(09|12|18):00:00/.test(weather.dt_txt)) {
                        return true;
                    }

                    return false;
                })
            }

            return Object.assign({}, state, {
                weathers,
                searched: action.searched,
            })

        case REQUEST_RESTAURANTS:
            let restaurants;
            if(action.restaurants.yelp) {
                if(JSON.parse(action.restaurants.yelp).errors) {
                    restaurants = [];
                } else {
                    restaurants = get(JSON.parse(action.restaurants.yelp), 'data.search.business', [])
                }
            } else {

                restaurants = get(JSON.parse(action.restaurants), 'data.search.business', []);
            }

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