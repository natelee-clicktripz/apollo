import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchForecasts, fetchRestaurants, fetchRestaurantsAndForecasts, setDoneLoading, setStartLoading } from '../actions';
import Restaurants from '../Restaurants';
import Weather from '../Weather';
import Search from '../Search';
import Loading from '../Loading';


const ResultsWrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 15%;
`;

const PowerByWrap = styled.small`
    align-self: center;
    margin-top: 20px;
`;

const NewGrid = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    background-color: #EFCA08;
    padding: 20px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    box-shadow: 5px 6px 3px 0px rgba(0,0,0,0.2);
`;

const Description = styled.div`
    margin: 20px 0 0 0;
    padding-left: 20px;
    background-color: #F49F0A;
    height: 50px;
    display: grid;
    align-content: center;
    justify-content: start;
    font-weight: bold;
    font-size: 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: 5px 6px 3px 0px rgba(0,0,0,0.2);
    color: white;
`;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Los Angeles, CA',
            weather: [],
            restaurants: [],
        };

    }

    searchChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        })
    }

    handleSearch = (e) => {
        const { dispatch } = this.props;
        let { location } = this.state;

        dispatch(fetchRestaurantsAndForecasts(location));
    }

    render() {
        let { isLoading, restaurants, weathers } = this.props.state.setData;
        return (
            <Fragment>
                <Search
                    handleClick={this.handleSearch}
                    handleChange={this.searchChange}
                    newValue={this.state.location}/>
                {
                    isLoading ? <Loading/> :
                    Object.keys(restaurants).length ?
                    <ResultsWrap>
                        <Description>Here's the weather</Description>
                        <NewGrid>
                            <Weather weather={weathers}/>
                        </NewGrid>
                        <Description>Some Restaurants to Try</Description>
                        <NewGrid>
                            <Restaurants restaurants={restaurants}/>
                        </NewGrid>
                        <PowerByWrap>Powered by Yelp and OpenWeatherAPI</PowerByWrap>
                    </ResultsWrap> :
                    ''
                }
            </Fragment>
        )
    }
}

function mapStateToProps(state, ownProps) {
  return {
      state
  }
}

export default withRouter(connect(mapStateToProps)(Profile));
