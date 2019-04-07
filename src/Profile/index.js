import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import RepositoryList, { REPOSITORY_FRAGMENT } from '../Repository';
import Loading from '../Loading';
import ErrorMessage from '../Error';

const GET_REPOSITORIES_OF_CURRENT_USER = gql `
  {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
      ) {
        edges {
          node {
            ...repository
          }
        }
      }
    }
  }

  ${REPOSITORY_FRAGMENT}
`;

const GET_REPOSITORIES_FILES = gql `
  {
  viewer {
    login
    name
    repository(name: "apollo") {
      id
      descriptionHTML
      object(expression: "master:src/index.js") {
        id
        ... on Blob {
          text
        }
      }
    }
  }
}


`;

const Profile = () => (
    // <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    //   {({ data, loading, error }) => {
    //     if (error) {
    //       return <ErrorMessage error={error} />;
    //     }

    //     const { viewer } = data;

    //     if (loading || !viewer) {
    //       return <Loading />;
    //     }

    //     return <RepositoryList repositories={viewer.repositories} />;
    //   }}
    // </Query>

    <Query query={GET_REPOSITORIES_FILES}>
      {({data, loading, error}) => {
            if(error) {
                console.log(error)
            }

            const {viewer} = data;

            if (loading || !viewer) {
                return <Loading />;
            }
            console.log(viewer);

            return <div>WIP</div>
      }}
  </Query>

);

export default Profile;