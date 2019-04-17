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
    width: 10%;
`;

const Item = styled.div`
    display:flex;
    justify-content: flex-start;
`;

const Weather = (props) => {
    const { weather } = props;

    return (
        weather.map((temp, i) => {
            let timeSplit = temp.dt_txt.split(' ');
            let dateSplit = timeSplit[0].split('-');
            const month = dateSplit[1];
            const day = dateSplit[2]
            const year = dateSplit[0]
            timeSplit[0] = `${month}/${day}/${year}`;
            timeSplit = timeSplit.join(' ');
            if(i < 10) {
                return (
                    <Wrap key={i}>
                        <Item>{timeSplit}</Item>
                        <Item>High: {temp.main.temp_max} F</Item>
                        <Item>Low: {temp.main.temp_min} F</Item>
                        <Item>Humidity: {temp.main.humidity}%</Item>
                        <Item>{temp.weather[0] ? `Condition: ${temp.weather[0].description}` : ''}</Item>
                    </Wrap>
                )
            }

            return '';
        })
    )
}

export default Weather;