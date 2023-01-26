import { ApolloClient, InMemoryCache } from '@apollo/client';
import { REACT_APP_PROD_URL, REACT_APP_DEV_URL } from '@env';

const BASE_URL = __DEV__ ? REACT_APP_DEV_URL : REACT_APP_PROD_URL;

export const client = new ApolloClient({
  uri: BASE_URL,
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
