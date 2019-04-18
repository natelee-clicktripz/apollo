import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

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
    flex-wrap: wrap;
    width: 100%;
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
                <AppBar position="static" color="inherit">
                    <Toolbar>

                            <Label htmlFor="location">Location</Label>
                            <InputBase value={this.state.location} onChange={this.searchChange}/>

                        <Button onClick={this.handleSearch}>Search</Button>
                    </Toolbar>
                </AppBar>
                {
                    Object.keys(restaurants).length ?
                    <div style={{"margin-top": 20 + 'px'}}>
                        <div>Here's the weather</div>
                        <ResultsWrap>
                            <Weather weather={weather}/>
                        </ResultsWrap>

                        <div style={{"margin-top": 20 + 'px'}}>Some Restaurants to Try</div>
                        <ResultsWrap>
                            <Restaurants restaurants={restaurants}/>
                        </ResultsWrap>
                        <PowerByWrap style={{"margin-top": 20 + 'px'}}>Powered by Yelp and OpenWeatherAPI</PowerByWrap>
                    </div> :
                    ''
                }
            </Fragment>
        )
    }
}

export default Profile;