import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import ErrorMessage from '../Error';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        }
    }

    componentDidMount() {
        const { location, genre } = this.props.match.params;
        fetch(`http://localhost:8000/api/yelpsearch/?location="${location}"&term="${genre}"`).then((res) => {
            return res.text();
        }).then((results) => {
            this.setState({
                restaurants: JSON.parse(results)
            })
        })
    }

    render() {
        const { restaurants } = this.state;
        return (
            <div>{restaurants}</div>
        )
    }
}

export default Results;