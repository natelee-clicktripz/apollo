import React from 'react';
import styled from 'styled-components';

const Wrap = {

    'boxShadow': `0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)`,
    "borderRadius": `4px`,
};


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
                    <div style={{...Wrap,"gridRow": "2/3", "gridColumn": `${i + 1}/${i+2}`}} key={i}>
                        <div>{timeSplit}</div>
                        <div>High: {temp.main.temp_max} F</div>
                        <div>Low: {temp.main.temp_min} F</div>
                        <div>Humidity: {temp.main.humidity}%</div>
                        <div>{temp.weather[0] ? `Condition: ${temp.weather[0].description}` : ''}</div>
                    </div>
                )
            }

            return '';
        })
    )
}

export default Weather;