import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Restaurants from '../Restaurants';
import Weather from '../Weather';
import Search from '../Search';

const ResultsWrap = styled.div`
    display: grid;
    grid-template: 10% 35% 10% 35% 10% / repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 20px;
`;

const WeatherDescription = styled.div`
    grid-area: 1 / 1 / 2 / autofill
`;

const WeatherWrap = styled.div`
    grid-area: 2 / 1 / 3 / auto-fill;
`;
const RestaurantDescription = styled.div`
    grid-area: 3 / 1 / 4 / autofill
`;

const RestaurantWrap = styled.div`
    grid-area: 4 / 1 / 5 / auto-fill;
    justify-self: center;
    align-self: center;

`;

const PowerByWrap = styled.small`
    grid-area: 5 / 1 / 6 / auto-fill;
    justify-self: center;
    align-self: center;
`;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: 'pizza',
            location: 'Los Angeles, CA',
            weather: [],
            restaurants: [],
        };

    }

    searchChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    handleSearch = (e) => {
        let { location} = this.state;

        fetch(`http://localhost:8000/api/weather/?location=${location}`).then((res) => {
            return res.json();
        }).then((results) => {
            this.setState({
                weather: results.weather ? JSON.parse(results.weather).list : !results.errors ? JSON.parse(results).list : []
            })
        })

        fetch(`http://localhost:8000/api/yelpsearch/?location="${location}"`).then((res) => {
            return res.json();
        }).then((results) => {
            this.setState({
                restaurants: results.yelp ? JSON.parse(results.yelp).data.search.business : !results.errors ? JSON.parse(results).data.search.business : []
            })
        })
    }
    render() {
        let { restaurants, weather } = this.state;
        return (
            <Fragment>
                <Search
                    handleClick={this.handleSearch}
                    handleChange={this.searchChange}
                    newValue={this.state.location}/>
                {
                    Object.keys(restaurants).length ?
                    <ResultsWrap>
                        <WeatherDescription>Here's the weather</WeatherDescription>
                        <Weather weather={weather}/>
                        <RestaurantDescription>Some Restaurants to Try</RestaurantDescription>
                        <Restaurants restaurants={restaurants}/>
                        <PowerByWrap>Powered by Yelp and OpenWeatherAPI</PowerByWrap>
                    </ResultsWrap> :
                    ''
                }
            </Fragment>
        )
    }
}

export default Profile;