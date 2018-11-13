import ApolloClient, {
  InMemoryCache
} from 'apollo-client-preset';
import {
  setContext
} from 'apollo-link-context';
import {
  createUploadLink
} from 'apollo-upload-client';
import { AsyncStorage } from 'react-native';
import { TOKEN_KEY } from '../constants';

export const uploadLink = createUploadLink({
  uri: 'http://10.0.3.2:4000/graphql',
  credentials: 'same-origin'
});

export const authLink = setContext(async (_, {
  headers
}) => {
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
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;