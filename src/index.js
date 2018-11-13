import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import client from './utils/apolloSetup';

import store from './store';
import Routes from './Routes';

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
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
