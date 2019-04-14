import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import ErrorMessage from '../Error';

class Results extends Component {
    constructor(props) {
        super(props);
    }

    handleSearch(e) {
    }

    render() {
        const { location, genre } = this.props.match.params;
        return (
            <div>{location} {genre}</div>
        )
    }
}

export default Results;