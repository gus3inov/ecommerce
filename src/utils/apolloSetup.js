import ApolloClient, {
  InMemoryCache,
  ApolloLink,
  split,
} from 'apollo-client-preset';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import { withClientState } from 'apollo-link-state';
import { createUploadLink } from 'apollo-upload-client';
import { AsyncStorage } from 'react-native';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { TOKEN_KEY } from '../constants';

export const uploadLink = createUploadLink({
  uri: 'http://10.0.3.2:4000/graphql',
  credentials: 'same-origin',
});

const clientSocket = new SubscriptionClient('ws://10.0.3.2:4000/graphql', {
  reconnect: true,
});

const socketlink = new WebSocketLink(clientSocket);

const stateLink = withClientState({
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      addUserId: (_, { userId }, { cache }) => {
        const data = {
          getUserId: {
            userId,
          },
        };
        cache.writeData({ data });
        return null;
      },
    },
  },
});

export const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  socketlink,
  ApolloLink.from([stateLink, authLink, uploadLink])
);

const client = new ApolloClient({
  uri: 'http://10.0.3.2:4000/graphql',
  link,
  cache: new InMemoryCache(),
});

export default client;
