import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Loading from '../Loading';
import ErrorMessage from '../Error';

const Wrap = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 20px;
    width: 13%;
`;

const Restaurants = (props) => {
    const { restaurants } = props;

    return (
        restaurants.map((restaurant, i) => {
            return (
                <Wrap key={i}>
                    <a href={restaurant.url} target="_blank">
                        <div>{restaurant.name}</div>
                        <div>{restaurant.location.address1}</div>
                        <div>{restaurant.location.city} {restaurant.location.state} {restaurant.location.postal_code}</div>
                    </a>
                </Wrap>
            )
        })
    )
}

export default Restaurants;