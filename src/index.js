import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-client-preset';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './Routes';
import { TOKEN_KEY } from './constants';

const httpLink = createHttpLink({
  uri: 'http://10.0.3.2:4000/graphql',
  credentials: 'same-origin',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  uri: 'http://10.0.3.2:4000',
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
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
      <Provider store={store}>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </Provider>
    );
  }
}

export default App;
