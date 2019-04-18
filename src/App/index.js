import React, { Component } from 'react';
import styled from 'styled-components';

import Profile from '../Profile';
import './style.css';

const Container = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 50px;
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
