import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://espark-lunch-app.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

