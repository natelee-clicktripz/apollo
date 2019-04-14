import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import ErrorMessage from '../Error';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: 'pizza',
            location: 'Los Angeles, CA'
        };

    }

    handleSearch = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <Fragment>
                <label htmlFor="genre">Genre</label>
                <input type="text" name="genre" value={this.state.genre} onChange={this.handleSearch}/>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" value={this.state.location} onChange={this.handleSearch}/>
                <Link to={"/search/"+this.state.location+"/"+this.state.genre}>Search</Link>
            </Fragment>
        )
    }
}

export default Profile;