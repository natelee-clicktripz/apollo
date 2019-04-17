import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../Loading';
import ErrorMessage from '../Error';
import Restaurants from '../Restaurants';
import Weather from '../Weather';

const Wrap = styled.div`
    display: flex;
    justify-content: center;

`;

const SearchItems = styled.div`
    padding: 15px;
`;

const Label = styled.label`
    padding-right: 10px;
`;

const ResultsWrap = styled.div`
    display: flex;
    flex: 1 0 18%;
    align-items: center;
    justify-content: center;
    padding-bottom: 50px;
`;

const PowerByWrap = styled.small`
    display: flex;
    justify-content: center;
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
                weather: !results.errors ? JSON.parse(results).list : []
            })
        })

        fetch(`http://localhost:8000/api/yelpsearch/?location="${location}"`).then((res) => {
            return res.json();
        }).then((results) => {
            this.setState({
                restaurants: !results.errors ? JSON.parse(results).data.search.business : []
            })
        })
    }

    render() {
        let { restaurants, weather } = this.state;
        return (
            <Fragment>
                <Wrap>
                    <SearchItems>
                        <Label htmlFor="location">Location</Label>
                        <input type="text" name="location" value={this.state.location} onChange={this.searchChange}/>
                    </SearchItems>
                    <SearchItems onClick={this.handleSearch}>Search</SearchItems>
                </Wrap>
                {
                    Object.keys(restaurants).length ?
                    <>
                        <div>Here's the weather</div>
                        <ResultsWrap>
                            <Weather weather={weather}/>
                        </ResultsWrap>
                        <div>Some Restaurants to Try</div>
                        <ResultsWrap>
                            <Restaurants restaurants={restaurants}/>
                        </ResultsWrap>
                        <PowerByWrap>Powered by Yelp and OpenWeatherAPI</PowerByWrap>
                    </> :
                    ''
                }
            </Fragment>
        )
    }
}

export default Profile;