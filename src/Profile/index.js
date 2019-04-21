import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

import Restaurants from '../Restaurants';
import Weather from '../Weather';
import Search from '../Search';

const ResultsWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 15%;
`;

const PowerByWrap = styled.small`
    align-self: center;
    margin-top: 20px;
`;

const NewGrid = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) ;
`;

const Description = styled.div`
    margin: 20px 0;
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
                        <Description>Here's the weather</Description>
                        <NewGrid>
                            <Weather weather={weather}/>
                        </NewGrid>
                        <Description>Some Restaurants to Try</Description>
                        <NewGrid>
                            <Restaurants restaurants={restaurants}/>
                        </NewGrid>
                        <PowerByWrap>Powered by Yelp and OpenWeatherAPI</PowerByWrap>
                    </ResultsWrap> :
                    ''
                }
            </Fragment>
        )
    }
}

export default Profile;