import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import ErrorMessage from '../Error';

const Restaurants = (props) => {
    const { restaurants } = props;
    return (
        restaurants.map((restaurant, i) => {
            return (
                <div key={i}>
                    <div>{restaurant.name}</div>
                    <div>{restaurant.url}</div>
                    <div>{restaurant.location.address1}</div>
                    <div>{restaurant.location.city} {restaurant.location.state} {restaurant.location.postal_code}</div>
                </div>
            )
        })
    )
}

export default Restaurants;