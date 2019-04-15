import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../Loading';
import ErrorMessage from '../Error';
import Restaurants from '../Restaurants';

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
    align-items: center;
    flex-direction: column;
`;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: 'pizza',
            location: 'Los Angeles, CA',
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
        let { location, genre } = this.state;

        fetch(`http://localhost:8000/api/yelpsearch/?location="${location}"&term="${genre}"`).then((res) => {
            return res.json();
        }).then((results) => {
            this.setState({
                restaurants: !results.errors ? JSON.parse(results).data.search.business : []
            })
        })
    }

    render() {
        let { restaurants } = this.state;
        return (
            <Fragment>
                <Wrap>
                    <SearchItems>
                        <Label htmlFor="genre">Genre</Label>
                        <input type="text" name="genre" value={this.state.genre} onChange={this.searchChange}/>
                    </SearchItems>
                    <SearchItems>
                        <Label htmlFor="location">Location</Label>
                        <input type="text" name="location" value={this.state.location} onChange={this.searchChange}/>
                    </SearchItems>
                    <SearchItems onClick={this.handleSearch}>Search</SearchItems>
                </Wrap>
                {
                    Object.keys(restaurants).length ?
                    <ResultsWrap>
                        <Restaurants restaurants={restaurants}/>
                        <small>Powered by Yelp</small>
                    </ResultsWrap> :
                    ''
                }
            </Fragment>
        )
    }
}

export default Profile;