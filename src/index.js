import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'

import configureStore from './store'
import * as serviceWorker from './serviceWorker';
import Root from './Root';

import './style.css';

// const GRAPHQL_URL = 'http://localhost:8000';

// const httpLink = new HttpLink({
//   uri: GRAPHQL_URL
// });

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );
//   }

//   if (networkError) {
//     console.log(`[Network error]: ${networkError}`);
//   }
// });

// const link = ApolloLink.from([errorLink, httpLink]);

// const cache = new InMemoryCache();

// const client = new ApolloClient({
//   link,
//   cache,
// });

const store = configureStore();

ReactDOM.render(
    <Router>
        <Root store={store} />
    </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
