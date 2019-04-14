import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import ErrorMessage from '../Error';

class Restaurants extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { restaurants } = this.props;

        return (
            <div>{restaurants}</div>
        )
    }
}

export default Restaurants;