import React, { Component } from 'react';
import styled from 'styled-components';

import Profile from '../Profile';

const Container = styled.main`
    display: flex;
    flex-direction: column;
`;

class App extends Component {
  render() {
    return (
        <Container>
            <Profile />
        </Container>
    )
  }
}

export default App;
