import React from 'react';
import { Provider } from 'react-redux';
import { Route } from "react-router-dom";

import App from '../App';

const Root = ({store}) => (
    <Provider store={store}>
        <Route path="/" component={App}/>
    </Provider>
)


export default Root;
