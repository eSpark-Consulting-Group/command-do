import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://espark-lunch-app.herokuapp.com/graphql',
  // uri: 'https://e-spark-lunch-backend-esparkmudassir.vercel.app/graphql',
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
