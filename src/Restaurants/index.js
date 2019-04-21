import React from 'react';
import styled from 'styled-components';

const Wrap = {

    'boxShadow': `0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)`,
    "borderRadius": `4px`,
};


const Restaurants = (props) => {
    const { restaurants } = props;

    return (
        restaurants.map((restaurant, i) => {
            return (
                <div style={{...Wrap,"gridRow": "4/5", "gridColumn": `${i + 1}/${i+2}`}}key={i}>
                    <a href={restaurant.url} rel="noopener noreferrer" target="_blank">
                        <div>{restaurant.name}</div>
                        <div>{restaurant.location.address1}</div>
                        <div>{restaurant.location.city} {restaurant.location.state} {restaurant.location.postal_code}</div>
                    </a>
                </div>
            )
        })
    )
}

export default Restaurants;