import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import ErrorMessage from '../Error';
import Restaurants from '../Restaurants';

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
                restaurants: results.errors ? JSON.parse(results).data.search.business : []
            })
        })
    }

    render() {
        let { restaurants } = this.state;
        return (
            <Fragment>
                <div>
                    <label htmlFor="genre">Genre</label>
                    <input type="text" name="genre" value={this.state.genre} onChange={this.searchChange}/>
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" value={this.state.location} onChange={this.searchChange}/>
                    <div style={{"width": 100+"px", "height": 100+"px"}} onClick={this.handleSearch}>Search</div>
                </div>
                {
                    Object.keys(restaurants).length ?
                    <Fragment>
                        <Restaurants restaurants={restaurants}/>
                        <small>Powered by Yelp</small>
                    </Fragment> :
                    ''
                }
            </Fragment>
        )
    }
}

export default Profile;