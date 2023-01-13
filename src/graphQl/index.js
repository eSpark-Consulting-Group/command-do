import { ApolloClient, InMemoryCache } from '@apollo/client';
import { REACT_APP_DEV_URL, REACT_APP_PROD_URL } from '@env';

export const client = new ApolloClient({
  // uri: REACT_APP_PROD_URL,
  uri: REACT_APP_DEV_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      notifyOnNetworkStatusChange: true,
    },
    watchQuery: {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  },
});
