import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../Loading';
import ErrorMessage from '../Error';
import Restaurants from '../Restaurants';
import Weather from '../Weather';
import Search from '../Search';

const ResultsWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`;

const PowerByWrap = styled.small`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const Description = styled.div`
    margin-top: 20px;
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
        const { classes } = this.props;
        return (
            <Fragment>
                <Search
                    handleClick={this.handleSearch}
                    handleChange={this.searchChange}
                    newValue={this.state.location}/>
                {
                    Object.keys(restaurants).length ?
                    <div>
                        <Description>Here's the weather</Description>
                        <ResultsWrap>
                            <Weather weather={weather}/>
                        </ResultsWrap>

                        <Description>Some Restaurants to Try</Description>
                        <ResultsWrap>
                            <Restaurants restaurants={restaurants}/>
                        </ResultsWrap>
                        <PowerByWrap>Powered by Yelp and OpenWeatherAPI</PowerByWrap>
                    </div> :
                    ''
                }
            </Fragment>
        )
    }
}

export default Profile;