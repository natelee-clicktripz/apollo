import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchForecasts, fetchRestaurants, fetchRestaurantsAndForecasts, setDoneLoading, setStartLoading, unsetErrorMessage, setErrorMessage } from '../actions';
import Restaurants from '../Restaurants';
import Weather from '../Weather';
import Search from '../Search';
import Loading from '../Loading';
import ErrorMessage from '../Error';


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
        const { dispatch } = this.props;
        const { name, value } = e.target;
        const { error } = this.props.state.setData;

        if(value === '') {
            dispatch(setErrorMessage('Location is needed! Please search for a location!'));
        }

        if(error && value !== '') {
            dispatch(unsetErrorMessage());
        }

        this.setState({
            [name]: value
        })
    }

    handleSearch = (e) => {
        const { dispatch } = this.props;
        const { location } = this.state;
        const { error } = this.props.state.setData;

        if(location.trim() === '') {
            dispatch(setErrorMessage('Cannot search with empty location!'))
        }
        if(!error) {
            dispatch(fetchRestaurantsAndForecasts(location));
        }
    }

    render() {
        let { isLoading, restaurants, weathers, msg, error, searched } = this.props.state.setData;
        return (
            <Fragment>
                <Search
                    handleClick={this.handleSearch}
                    handleChange={this.searchChange}
                    newValue={this.state.location}/>
                {
                    error ? <ErrorMessage error={msg}/> : isLoading ? <Loading/> : searched && (!restaurants.length || !weathers.length) ? <ErrorMessage error={'Cannot find that location! Please search again!'}/> :
                    Object.keys(restaurants).length ?
                    <ResultsWrap>
                        <Description>Here's the weather</Description>
                        <NewGrid>
                            <Weather forecasts={weathers}/>
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
