import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

import registerServiceWorker from './registerServiceWorker';
import App from './App';

import './style.css';

const cache = new InMemoryCache();
const GITHUB_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
    uri: GITHUB_BASE_URL,
    headers: {
        authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
    },
});

const errorLink = onError(({graphqlError, networkError}) = > {
    if(graphqlError) {

    }

    if(networkError) {

    }
})

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
    link,
    cache,
})

ReactDOM.render(
    <ApolloClient client={client}>
        <App />
    </ApolloClient>,
    document.getElementById('root')
);

registerServiceWorker();