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
    width: 50%;
`;

const Weather = (props) => {
    const { weather } = props;

    return (
        weather.map((temp, i) => {
            return (
                <Wrap key={i}>
                    <div>{temp.dt_txt}</div>
                    <div>High: {temp.main.temp_max} F</div>
                    <div>Low: {temp.main.temp_min} F</div>
                    <div>Humidity: {temp.main.humidity}%</div>
                    <div>{temp.weather[0] ? `Condition: ${temp.weather[0].description}` : ''}</div>
                </Wrap>
            )
        })
    )
}

export default Weather;