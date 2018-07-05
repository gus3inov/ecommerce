import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import Routes from './Routes';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

class App extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <ApolloProvider client={client}>
          <AppLoading />
        </ApolloProvider>
      );
    }

    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    );
  }
}

export default App;
