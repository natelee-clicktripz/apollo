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
    search(term: "pizza", location:"los angeles", limit:10) {
        business {
          id
        name
        url
        location {
          address1
          address2
          address3
          city
          state
          postal_code
          country
          formatted_address
        }
        hours {
          hours_type
          is_open_now
        }
        reviews {
          id
        }
        alias

        }
         total
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

            if (loading) {
                return <Loading />;
            }
            console.log(data);

            return <div>WIP</div>
      }}
  </Query>

);

export default Profile;