import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    padding: 20px;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
    border-radius: 4px;
    background-color: #BBDEF0;
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
            return (
                <Wrap key={i}>
                    <div>{timeSplit}</div>
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